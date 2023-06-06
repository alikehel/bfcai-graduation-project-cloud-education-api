import express from "express";

import { createExam, getExamWithoutAnswers, getExams } from "../controllers/exams.controller";

import { courseExist } from "../middlewares/courseExist.middleware";
import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = express.Router();

router.post(
    "/:organization/courses/:courseCode/exams",
    orgExist,
    isLoggedIn,
    courseExist,
    isAutherized(["ADMIN", "TEACHER"]),
    createExam
);

// Exams Data without questions
router.get(
    "/:organization/exams",
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    getExams
);

// Exam Data without answers
router.get(
    "/:organization/exams/:examId",
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    getExamWithoutAnswers
);

// Exam Data with questions and answers
// router.get(
//     "/:organization/exams-answers/:examId",
//     orgExist,
//     isLoggedIn,
//     isAutherized(["ADMIN", "TEACHER"]),
//     getExamWithAnswers
// );

// router.patch(
//     "/:organization/exams/:examId",
//     orgExist,
//     isLoggedIn,
//     isAutherized(["ADMIN", "TEACHER"]),
//     updateExam
// );

// router.delete(
//     "/:organization/exams/:examId",
//     orgExist,
//     isLoggedIn,
//     isAutherized(["ADMIN", "TEACHER"]),
//     deleteExam
// );

// router.post(
//     "/:organization/exams/:examId/answers",
//     orgExist,
//     isLoggedIn,
//     isAutherized(["STUDENT"]),
//     answerExam
// );

export default router;
