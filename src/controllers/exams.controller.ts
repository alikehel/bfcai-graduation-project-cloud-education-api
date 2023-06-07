import { NextFunction, Request, Response } from "express";
import { ExamModel } from "../models/exam.model";
import { UserModel } from "../models/user.model";
import { checkToxicity } from "../services/ai.service";
import { gradeAnswer } from "../services/gpt.service";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
import { ExamAnswerSchema, ExamCreateSchema } from "../validation";

const examModel = new ExamModel();
const userModel = new UserModel();
export const createExam = catchAsync(async (req: Request, res: Response) => {
    const exam = ExamCreateSchema.parse(req.body);
    const subdomain = req.params.organization;
    const courseCode = req.params.courseCode;

    const createdExam = await examModel.createExam(subdomain, courseCode, exam);

    res.status(201).json({
        status: "success",
        // data: createdExam
        data: createdExam
    });
});

export const getExams = catchAsync(async (req: Request, res: Response) => {
    const subdomain = req.params.organization;
    // const courseCode = req.params.courseCode;
    const userID = res.locals.user.id;

    let exams;
    if (res.locals.user.role === "STUDENT") {
        exams = await examModel.getExamsForStudent(userID);
    } else {
        exams = await examModel.getExams(subdomain);
    }

    res.status(200).json({
        status: "success",
        data: exams
    });
});

export const getExamWithoutAnswers = catchAsync(
    async (req: Request, res: Response) => {
        const examId = req.params.examId;

        // Retrieve the exam from the database without including answers
        const exam = await examModel.getExamWithoutAnswers(examId);

        if (!exam) {
            throw new AppError("Exam not found.", 404);
        }

        // Check if the exam is available

        // const currentDateTime = new Date();
        // const examEndTime = new Date(
        //     currentDateTime.getTime() + exam.examDurationInMinutes * 60000
        // );

        // if (currentDateTime >= examEndTime) {
        //     // Exam duration has ended, send 'Exam Not Available' response
        //     throw new AppError("Exam Not Available.", 200);
        // }

        res.status(200).json({
            status: "success",
            data: exam
        });
    }
);

export const answerExam = catchAsync(async (req: Request, res: Response) => {
    const subdomain = req.params.organization;
    const examAnswers = ExamAnswerSchema.parse(req.body);
    // const courseCode = req.params.courseCode;
    const examId = req.params.examId;
    // const userID = res.locals.user.id;

    const exam = await examModel.getExamWithAnswers(examId);

    // if (!exam) {
    //     throw new AppError("Exam not found.", 404);
    // }

    // // Check if the exam is available
    // const currentDateTime = new Date();
    // const examEndTime = new Date(
    //     currentDateTime.getTime() + exam.examDurationInMinutes * 60000
    // );
    // if (currentDateTime >= examEndTime) {
    //     // Exam duration has ended, send 'Exam Not Available' response
    //     throw new AppError("Exam Not Available.", 200);
    // }

    // Check if the user has already answered the exam

    // Grade the exam
    let examResult = new Array();
    for (let i = 0; i < exam.length; i++) {
        const question = exam[i];
        const answer = examAnswers[i];
        let answerResult;

        if (question.questionType === "essay") {
            const toxicity = await checkToxicity(answer.questionAnswer);
            if (toxicity > 0.7) {
                throw new AppError(
                    "You violated our guidelines. Not Submitted. Warning issued. Please review the guidelines.",
                    400
                );
            }

            const essayAnswerGrade = await gradeAnswer(
                question.questionText,
                question.questionAnswer,
                answer.questionAnswer
            );
            if (essayAnswerGrade > 50) {
                answerResult = {
                    questionText: question.questionText,
                    ...answer,
                    isCorrect: true
                };
            } else {
                answerResult = {
                    questionText: question.questionText,
                    ...answer,
                    isCorrect: false
                };
            }
        } else if (question.questionType === "mcq") {
            question.questionChoices.forEach((choice: any) => {
                if (choice.isCorrect) {
                    if (choice.choiceText === answer.questionAnswer) {
                        answerResult = {
                            questionText: question.questionText,
                            ...answer,
                            isCorrect: true
                        };
                    } else {
                        answerResult = {
                            questionText: question.questionText,
                            ...answer,
                            isCorrect: false
                        };
                    }
                }
            });
        }
        examResult.push(answerResult);
    }

    // const examResult = await examModel.answerExam(
    //     subdomain,
    //     examId,
    //     userID,
    //     examAnswers
    // );

    res.status(200).json({
        status: "success",
        data: examResult
    });
});

// export const getExamWithAnswers = catchAsync(
//     async (req: Request, res: Response) => {
//         const { examId } = req.params;
//         const exam = await examModel.getExamWithAnswers(examId);

//         if (!exam) {
//             throw new AppError("Exam not found.", 404);
//         }

//         res.status(200).json({
//             status: "success",
//             data: exam
//         });
//     }
// );

// export const updateExam = catchAsync(async (req: Request, res: Response) => {
//     const { examId } = req.params;
//     const exam = ExamCreateSchema.parse(req.body);

//     const updatedExam = await examModel.updateExam(exam, examId);

//     res.status(200).json({
//         status: "success",
//         data: updatedExam
//     });
// });

// export const deleteExam = catchAsync(async (req: Request, res: Response) => {
//     const { examId } = req.params;

//     await examModel.deleteExam(examId);

//     res.status(200).json({
//         status: "success"
//     });
// });

// export const answerExam = catchAsync(async (req, res) => {
//     const { examId } = req.params;
//     const examAnswers = ExamAnswersSchema.parse(req.body);
//     console.log(examAnswers);

//     // // Get the exam from the database
//     // const exam = await examModel.getExam(examId);

//     // if (!exam) {
//     //     // If exam is null, return an appropriate response
//     //     throw new AppError("Exam not found.", 404);
//     // }

//     // const userAnswers = mcqAnswers.map((answer: any) => answer.answerId);

//     // // Calculate the points for MCQ questions
//     // let totalPoints = 0;
//     // for (let i = 0; i < exam.mcqQuestions.length; i++) {
//     //     const question = exam.mcqQuestions[i];
//     //     const userAnswer = userAnswers[i];

//     //     if (question && question.answerId === userAnswer) {
//     //         // The answer is correct, increment the points
//     //         totalPoints++;
//     //     }
//     // }

//     // // Update the user's grade in the database
//     // // const myId = req.user?.id as number;
//     // // await prisma.user.update({
//     // //   where: { id: myId },
//     // //   data: { gpa: { increment: totalPoints } },
//     // // });

//     // Return the total points as the response
//     res.status(200).json({
//         status: "success",
//         // data: totalPoints
//         data: "OK"
//     });
// });
