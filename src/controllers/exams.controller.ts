import { Request, Response } from "express";
import { ExamModel } from "../models/exam.model";
import { LeaderboardModel } from "../models/leaderboard.model";
import { NotificationModel } from "../models/notification.model";
import { checkToxicity } from "../services/ai.service";
import { gradeAnswer } from "../services/gpt.service";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
import { ExamAnswerSchema, ExamCreateSchema } from "../validation";
const examModel = new ExamModel();
const notificationModel = new NotificationModel();
const leaderboardModel = new LeaderboardModel();
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
        const userId = res.locals.user.id;

        // Retrieve the exam from the database without including answers
        const exam = await examModel.getExamWithoutAnswers(examId, userId);

        if (!exam) {
            throw new AppError("Exam not found.", 404);
        }

        // Check if the exam is available
        const examStartTime = new Date(exam.startTime)
            .toLocaleString("en-UK", { timeZone: "Africa/Cairo" })
            .split(",")[0]
            .split("/")
            .reverse()
            .join("-");
        const examEndTime = new Date(exam.endTime)
            .toLocaleString("en-UK", { timeZone: "Africa/Cairo" })
            .split(",")[0]
            .split("/")
            .reverse()
            .join("-");
        // get date in this format 2021-05-30 in egypt time
        const currentDateTime = new Date()
            .toLocaleString("en-UK", { timeZone: "Africa/Cairo" })
            .split(",")[0]
            .split("/")
            .reverse()
            .join("-");
        // console.log(examStartTime, currentDateTime, examEndTime);

        // if (currentDateTime < examStartTime || currentDateTime > examEndTime) {
        if (currentDateTime > examEndTime) {
            // Exam duration has ended, send 'Exam Not Available' response
            throw new AppError("Exam has ended.", 404);
        } else if (currentDateTime < examStartTime) {
            // Exam duration has not started, send 'Exam Not Available' response
            throw new AppError("Exam hasn't started yet.", 404);
        }

        const status = await examModel.getExamStatus(examId, userId);
        if (
            status?.status === "INPROGRESS" &&
            Date.now() > +status.durationEnd
        ) {
            await examModel.updateExamStatus(examId, userId, "MISSED");
            throw new AppError(
                "You have already started this exam and its duration is finished",
                400
            );
        }

        // console.log(new Date(1686307402625));
        // console.log(new Date(Date.now()));

        const remainingMinutes =
            (parseInt(status?.durationEnd as string) - Date.now()) / 1000 / 60;

        res.status(200).json({
            status: "success",
            data: { ...exam, remainingMinutes }
        });
    }
);

export const answerExam = catchAsync(async (req: Request, res: Response) => {
    const examAnswers = ExamAnswerSchema.parse(req.body);
    // const courseCode = req.params.courseCode;
    const examId = req.params.examId;
    const userID = res.locals.user.id;
    const subdomain = req.params.organization;
    const examName = await examModel.getExamName(examId);

    const {
        parsedQuestions: exam,
        startTime,
        endTime
    } = await examModel.getExamWithAnswers(examId);
    // console.log(exam);

    if (!exam) {
        throw new AppError("Exam not found.", 404);
    }

    // Check if the exam is available
    const examStartTime = new Date(startTime)
        .toLocaleString("en-UK", { timeZone: "Africa/Cairo" })
        .split(",")[0]
        .split("/")
        .reverse()
        .join("-");
    const examEndTime = new Date(endTime)
        .toLocaleString("en-UK", { timeZone: "Africa/Cairo" })
        .split(",")[0]
        .split("/")
        .reverse()
        .join("-");
    // get date in this format 2021-05-30 in egypt time
    const currentDateTime = new Date()
        .toLocaleString("en-UK", { timeZone: "Africa/Cairo" })
        .split(",")[0]
        .split("/")
        .reverse()
        .join("-");
    // console.log(examStartTime, currentDateTime, examEndTime);

    // if (currentDateTime < examStartTime || currentDateTime > examEndTime) {
    if (currentDateTime > examEndTime) {
        // Exam duration has ended, send 'Exam Not Available' response
        throw new AppError("Exam has ended.", 404);
    } else if (currentDateTime < examStartTime) {
        // Exam duration has not started, send 'Exam Not Available' response
        throw new AppError("Exam hasn't started yet.", 404);
    }

    // Check if the user has already answered the exam
    const status = await examModel.getExamStatus(examId, userID);
    if (status?.status === "FINISHED") {
        throw new AppError("You have already finished this exam.", 400);
    }

    // Check if the user has already started the exam and exam duration has ended
    if (status?.status === "INPROGRESS" && Date.now() > +status.durationEnd) {
        await examModel.updateExamStatus(examId, userID, "MISSED");
        throw new AppError(
            "You have already started this exam and its duration is finished",
            400
        );
    }

    // Check if the user has already submitted the exam and it is being graded
    if (status?.status === "GRADING") {
        throw new AppError(
            "You have already submitted this exam and it is being graded",
            400
        );
    }

    // Check if the user hasfailed the exam
    if (status?.status === "FAILED") {
        throw new AppError(
            "You have failed this exam and you can't submit it again",
            400
        );
    }

    res.status(200).json({
        status: "success",
        data: "Exam submitted successfully. You will be notified with your grade."
    });

    // Check Toxicity
    for (let i = 0; i < exam.length; i++) {
        const question = exam[i];
        const answer = examAnswers[i];

        if (question.questionType === "essay") {
            const toxicity = await checkToxicity(answer.questionAnswer);
            if (toxicity > 0.7) {
                await notificationModel.sendNotification(
                    "Exams",
                    `Your exam, ${examName}, has not been graded because your answer "${answer.questionAnswer}" contains inappropriate content.`,
                    userID,
                    examId
                );
                await examModel.updateExamStatus(examId, userID, "FAILED");
                return;
            }
        }
    }

    // Grade the exam
    try {
        await examModel.updateExamStatus(examId, userID, "GRADING");
        const examResult: {
            questionType: "mcq" | "essay";
            questionAnswer: string;
            questionText: string;
            modelAnswer: string;
            isCorrect: boolean;
        }[] = [];
        let score = 0;
        for (let i = 0; i < exam.length; i++) {
            const question = exam[i];
            const answer = examAnswers[i];
            let answerResult: {
                questionType: "mcq" | "essay";
                questionAnswer: string;
                questionText: string;
                modelAnswer: string;
                isCorrect: boolean;
            };

            if (question.questionType === "essay") {
                const essayAnswerGrade = await gradeAnswer(
                    question.questionText,
                    question.questionAnswer,
                    answer.questionAnswer
                );
                if (essayAnswerGrade > 50) {
                    answerResult = {
                        questionText: question.questionText,
                        ...answer,
                        modelAnswer: question.questionAnswer,
                        isCorrect: true
                    };
                    examResult.push(answerResult);
                    score++;
                } else {
                    answerResult = {
                        questionText: question.questionText,
                        ...answer,
                        modelAnswer: question.questionAnswer,
                        isCorrect: false
                    };
                    examResult.push(answerResult);
                }
            } else if (question.questionType === "mcq") {
                question.questionChoices.forEach((choice) => {
                    if (choice.isCorrect) {
                        if (choice.choiceText === answer.questionAnswer) {
                            answerResult = {
                                questionText: question.questionText,
                                ...answer,
                                modelAnswer: question.questionChoices.find(
                                    (choice) => choice.isCorrect
                                )?.choiceText as string,
                                isCorrect: true
                            };
                            examResult.push(answerResult);
                            score++;
                        } else {
                            answerResult = {
                                questionText: question.questionText,
                                ...answer,
                                modelAnswer: question.questionChoices.find(
                                    (choice) => choice.isCorrect
                                )?.choiceText as string,
                                isCorrect: false
                            };
                            examResult.push(answerResult);
                        }
                    }
                });
            }
        }
        score = Math.round((score / exam.length) * 100);

        await examModel.answerExam(examId, userID, examResult, score);
        await leaderboardModel.updateLeaderboard(subdomain, userID, score);

        await notificationModel.sendNotification(
            "Exams",
            `Your exam, ${examName}, has been graded`,
            userID,
            examId
        );
    } catch (err) {
        await examModel.updateExamStatus(examId, userID, "INPROGRESS");
        console.log(err);
    }
});

export const getExamsResults = catchAsync(
    async (req: Request, res: Response) => {
        const subdomain = req.params.organization;
        // const courseCode = req.params.courseCode;
        const userID = res.locals.user.id;

        const examsResults = await examModel.getExamsResults(subdomain, userID);

        res.status(200).json({
            status: "success",
            data: examsResults
        });
    }
);

export const getExamResult = catchAsync(async (req: Request, res: Response) => {
    const subdomain = req.params.organization;
    // const courseCode = req.params.courseCode;
    // const userID = res.locals.user.id;
    const examResultId = req.params.examResultId;

    const examResult = await examModel.getExamResult(subdomain, examResultId);

    res.status(200).json({
        status: "success",
        data: {
            ...examResult,
            answers: JSON.parse(examResult?.answers as string)
        }
    });
});
