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
                    endTime: true
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
                    endTime: true
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

    async getExamWithoutAnswers(examId: string) {
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

            const examDataWithoutAnswers = {
                ...examDataWithAnswers,
                questions: questionsWithoutAnswers
            };

            return examDataWithoutAnswers;
        } catch (err) {
            throw err;
        }
    }

    // async getExamWithAnswers(id: string) {
    //     try {
    //         const examData = await prisma.exam.findUnique({
    //             where: { id },
    //             select: {
    //                 mcqQuestions: {
    //                     select: {
    //                         id: true,
    //                         questionText: true,
    //                         answerId: true,
    //                         choices: {
    //                             select: {
    //                                 id: true,
    //                                 choiceText: true,
    //                                 choiceId: true
    //                             }
    //                         }
    //                     }
    //                 },
    //                 essayQuestions: {
    //                     select: {
    //                         id: true,
    //                         questionText: true,
    //                         questionAnswer: true
    //                     }
    //                 }
    //             }
    //         });

    //         return examData;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async updateExam(exam: ExamCreateType, id: string) {
    //     try {
    //         const updateExam = await prisma.exam.update({
    //             where: { id },
    //             data: {
    //                 ...exam,
    //                 mcqQuestions: {
    //                     create: exam.mcqQuestions?.map((question) => ({
    //                         questionText: question.questionText,
    //                         answerId: question.answerId,
    //                         choices: {
    //                             create: question.choices.map((choice) => ({
    //                                 choiceText: choice.choiceText,
    //                                 choiceId: choice.choiceId
    //                             }))
    //                         }
    //                     }))
    //                 },
    //                 essayQuestions: exam.essayQuestions
    //                     ? {
    //                           create: exam.essayQuestions.map((question) => ({
    //                               questionText: question.questionText,
    //                               questionAnswer: question.questionAnswer
    //                           }))
    //                       }
    //                     : undefined
    //             }
    //         });
    //         return updateExam;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async deleteExam(examId: string) {
    //     return prisma.exam.delete({
    //         where: { id: examId }
    //     });
    // }

    // async getExam(examId: string) {
    //     return prisma.exam.findUnique({
    //         where: { id: examId },
    //         include: { mcqQuestions: true }
    //     });
    // }

    //  async getUserExamList(userId:string) {
    //     try {
    //       const user = await prisma.user.findUnique({
    //         where: { id: userId },
    //         select: {
    //           examList: {
    //             include: {
    //               exams: true
    //             }
    //           }
    //         }
    //       });

    //       if (!user) {
    //         throw new Error("User not found");
    //       }

    //       return user.examList;
    //     } catch (error) {
    //       console.error("Failed to get user's exam list:", error);
    //       throw error;
    //     }
    //   }

    // async updateExamList(userId: string, examId: string) {
    //     return prisma.examList.update({
    //         where: { userId },
    //         data: {
    //             exams: {
    //                 connect: { id: examId }
    //             }
    //         }
    //     });
    // }

    // async updateExamListForAllUsers(
    //     users: User[],
    //     examId: string
    // ): Promise<void> {
    //     await Promise.all(
    //         users.map(async (user) => {
    //             await this.updateExamList(user.id, examId);
    //         })
    //     );
    // }

    // async getOwner() {
    //     try {
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async answerExam() {
    //     try {
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async examExist() {
    //     try {
    //     } catch (err) {
    //         throw err;
    //     }
    // }
}
