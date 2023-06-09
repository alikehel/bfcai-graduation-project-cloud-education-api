import { Exam, Prisma, PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.util";
import { ExamCreateSchema, ExamCreateType } from "../validation";

const prisma = new PrismaClient();

export class ExamModel {
    async createExam(
        subdomain: string,
        courseCode: string,
        exam: ExamCreateType
    ) {
        try {
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
        } catch (err) {
            throw err;
        }
    }

    async getExams(subdomain: string) {
        try {
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
        } catch (err) {
            throw err;
        }
    }

    async getExamsForStudent(userID: string) {
        try {
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
        } catch (err) {
            throw err;
        }
    }

    async getExamWithoutAnswers(examId: string, userId: string) {
        try {
            const examDataWithAnswers = (await prisma.exam.findUnique({
                where: {
                    id: examId
                }
            })) as Exam;

            const questionsWithAnswers: any = JSON.parse(
                examDataWithAnswers.questions
            );

            const questionsWithoutAnswers = questionsWithAnswers.map(
                (question: any) => {
                    const questionWithoutAnswer = {
                        ...question,
                        questionChoices: question.questionChoices?.map(
                            (choice: any) => {
                                const choiceWithoutAnswer = {
                                    ...choice,
                                    isCorrect: undefined
                                };
                                return choiceWithoutAnswer;
                            }
                        ),
                        questionAnswer: undefined
                    };
                    return questionWithoutAnswer;
                }
            );

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
        } catch (err) {
            throw err;
        }
    }

    async getExamWithAnswers(examId: string) {
        try {
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

            const parsedQuestions: any = JSON.parse(
                examDataWithAnswers.questions
            );

            return {
                parsedQuestions,
                startTime: examDataWithAnswers.startTime,
                endTime: examDataWithAnswers.endTime,
                duration: examDataWithAnswers.duration
            };
        } catch (err) {
            throw err;
        }
    }

    async updateExamStatus(examId: string, userId: string, status: string) {
        try {
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
        } catch (err) {
            throw err;
        }
    }

    async getExamStatus(examId: string, userId: string) {
        try {
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
        } catch (err) {
            throw err;
        }
    }

    async answerExam(
        examId: string,
        userId: string,
        answers: any,
        score: number
    ) {
        try {
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
        } catch (err) {
            throw err;
        }
    }
}
