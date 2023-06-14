import { Exam, PrismaClient } from "@prisma/client";
// import AppError from "../utils/AppError.util";
import { ExamCreateType, QuestionsType } from "../validation";

const prisma = new PrismaClient();

export class ExamModel {
    async createExam(
        subdomain: string,
        courseCode: string,
        exam: ExamCreateType
    ) {
        const createdExam = await prisma.exam.create({
            data: {
                ...exam,
                questions: JSON.stringify(exam.questions),
                course: {
                    connect: {
                        codeSubdomain: {
                            code: courseCode,
                            organizationSubdomain: subdomain
                        }
                    }
                }
            }
        });
        return createdExam;
    }

    async getExams(subdomain: string) {
        const exams = await prisma.exam.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                duration: true,
                startTime: true,
                endTime: true,
                course: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                course: {
                    organizationSubdomain: subdomain
                }
            }
        });
        return exams;
    }

    async getExamsForStudent(userID: string) {
        const exams = await prisma.exam.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                duration: true,
                startTime: true,
                endTime: true,
                course: {
                    select: {
                        name: true
                    }
                },
                examResult: {
                    select: {
                        status: true,
                        score: true
                    },
                    where: {
                        userId: userID
                    }
                }
            },
            where: {
                course: {
                    users: {
                        some: {
                            id: userID
                        }
                    }
                }
            }
        });
        return exams;
    }

    async getExamWithoutAnswers(examId: string, userId: string) {
        const examDataWithAnswers = (await prisma.exam.findUnique({
            where: {
                id: examId
            }
        })) as Exam;

        const questionsWithAnswers: QuestionsType = JSON.parse(
            examDataWithAnswers.questions
        );

        const questionsWithoutAnswers = questionsWithAnswers.map((question) => {
            let questionWithoutAnswer;
            if (question.questionType === "mcq") {
                questionWithoutAnswer = {
                    ...question,
                    questionChoices: question.questionChoices?.map((choice) => {
                        const choiceWithoutAnswer = {
                            ...choice,
                            isCorrect: undefined
                        };
                        return choiceWithoutAnswer;
                    }),
                    questionAnswer: undefined
                };
            } else if (question.questionType === "essay") {
                questionWithoutAnswer = {
                    ...question,
                    questionAnswer: undefined
                };
            }

            return questionWithoutAnswer;
        });

        await prisma.examResult.upsert({
            where: {
                examId_userId: {
                    examId: examId,
                    userId: userId
                }
            },
            update: {},
            create: {
                examId: examId,
                userId: userId,
                answers: JSON.stringify([]),
                durationEnd: (
                    Date.now() +
                    examDataWithAnswers.duration * 60 * 1000
                ).toString()
            }
        });

        const examDataWithoutAnswers = {
            ...examDataWithAnswers,
            questions: questionsWithoutAnswers
        };

        return examDataWithoutAnswers;
    }

    async getExamWithAnswers(examId: string) {
        const examDataWithAnswers = (await prisma.exam.findUnique({
            where: {
                id: examId
            },
            select: {
                questions: true,
                startTime: true,
                endTime: true,
                duration: true
            }
        })) as Exam;

        const parsedQuestions: QuestionsType = JSON.parse(
            examDataWithAnswers.questions
        );

        return {
            parsedQuestions,
            startTime: examDataWithAnswers.startTime,
            endTime: examDataWithAnswers.endTime,
            duration: examDataWithAnswers.duration
        };
    }

    async updateExamStatus(examId: string, userId: string, status: string) {
        await prisma.examResult.update({
            where: {
                examId_userId: {
                    examId: examId,
                    userId: userId
                }
            },
            data: {
                status: status
            }
        });
    }

    async getExamStatus(examId: string, userId: string) {
        const status = await prisma.examResult.findUnique({
            where: {
                examId_userId: {
                    examId: examId,
                    userId: userId
                }
            },
            select: {
                status: true,
                createdAt: true,
                durationEnd: true
            }
        });
        return status;
    }

    async answerExam(
        examId: string,
        userId: string,
        answers: {
            questionType: "mcq" | "essay";
            questionAnswer: string;
            questionText: string;
            isCorrect: boolean;
        }[],
        score: number
    ) {
        await prisma.examResult.update({
            where: {
                examId_userId: {
                    examId: examId,
                    userId: userId
                }
            },
            data: {
                status: "FINISHED",
                score: score,
                answers: JSON.stringify(answers)
            }
        });
    }

    async getExamsResults(subdomain: string, userId: string) {
        const examsResults = await prisma.examResult.findMany({
            select: {
                id: true,
                score: true,
                exam: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            },
            where: {
                user: {
                    id: userId
                },
                status: "FINISHED"
            }
        });
        return examsResults;
    }

    async getExamResult(subdomain: string, examResultId: string) {
        const examResult = await prisma.examResult.findUnique({
            select: {
                id: true,
                score: true,
                answers: true,
                exam: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            },
            where: {
                id: examResultId
            }
        });
        return examResult;
    }
}
