import { json } from "body-parser";
import { CourseModel } from "../models/course.model";
import { UserModel } from "../models/user.model";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
import {
    CourseCreateSchema,
    CourseCreateType,
    CourseReviewSchema,
    CourseUpdateSchema,
    CourseUpdateType
} from "../validation";

import { checkToxicity, getSentiment } from "../services/ai.service";

const courseModel = new CourseModel();
const userModel = new UserModel();

export const createCourse = catchAsync(async (req, res, next) => {
    const course = CourseCreateSchema.parse(req.body);
    const subdomain = req.params.organization;
    const ownerID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    const createdCourse = await courseModel.create(
        { ...course },
        subdomain,
        ownerID
    );

    res.status(201).json({
        status: "success",
        data: createdCourse
    });
});

export const updateCourse = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const course = CourseUpdateSchema.parse(req.body);
    const subdomain = req.params.organization;
    const userID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    // Check if the current user is the owner or the admin
    if (
        (await courseModel.getOwner(subdomain, courseCode)) !== userID ||
        res.locals.user.role !== "ADMIN"
    ) {
        throw new AppError("You are not the owner of this course!", 401);
    }

    const updatedCourse = await courseModel.update(
        { ...course },
        subdomain,
        courseCode
    );

    res.status(201).json({
        status: "success",
        data: updatedCourse
    });
});

export const deleteCourse = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const subdomain = req.params.organization;
    const userID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    // Check if the current user is the owner or the admin
    if (
        (await courseModel.getOwner(subdomain, courseCode)) !== userID ||
        res.locals.user.role !== "ADMIN"
    ) {
        // console.log({
        //     currentuser: userID,
        //     owner: await courseModel.getOwner(subdomain, courseCode)
        // });

        throw new AppError("You are not the owner of this course!", 401);
    }

    const deleted = await courseModel.delete(subdomain, courseCode);

    res.status(200).json({
        status: "success",
        message: "Course deleted successfully"
    });
});

export const getCourse = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const subdomain = req.params.organization;
    // const userID = (await userModel.getUserID(
    //     res.locals.user.email,
    //     subdomain
    // )) as string;

    // Check if the current user is the owner or the admin
    // if (
    //     (await courseModel.getOwner(subdomain, courseCode)) !== userID ||
    //     res.locals.user.role !== "ADMIN"
    // ) {
    //     throw new AppError("You are not the owner of this course!", 401);
    // }

    const courseData = await courseModel.getCourseData(subdomain, courseCode);

    res.status(200).json({
        status: "success",
        data: courseData
    });
});

export const getAllCourses = catchAsync(async (req, res, next) => {
    const subdomain = req.params.organization;
    const userID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    // Check if the current user is the owner or the admin
    // if (
    //     (await courseModel.getOwner(subdomain, courseCode)) !== userID ||
    //     res.locals.user.role !== "ADMIN"
    // ) {
    //     throw new AppError("You are not the owner of this course!", 401);
    // }
    let coursesCount;
    if (
        res.locals.user.role === "ADMIN" ||
        res.locals.user.role === "TEACHER"
    ) {
        coursesCount = await courseModel.getCoursesCount(subdomain);
    } else {
        coursesCount = await courseModel.getCoursesCountForUser(
            subdomain,
            userID
        );
    }

    const pagesCount = Math.ceil(coursesCount / 10);

    let page = 1;
    if (
        req.query.page &&
        !Number.isNaN(+req.query.page) &&
        +req.query.page > 0
    ) {
        page = +req.query.page;
    }
    if (page > pagesCount) {
        throw new AppError("Page number out of range", 400);
    }
    const take = page * 10;
    const skip = (page - 1) * 10;
    // if (Number.isNaN(offset)) {
    //     skip = 0;
    // }
    let courses;
    if (
        res.locals.user.role === "ADMIN" ||
        res.locals.user.role === "TEACHER"
    ) {
        courses = await courseModel.getAllCourseData(subdomain, skip, take);
    } else {
        courses = await courseModel.getAllCourseDataForUser(
            subdomain,
            userID,
            skip,
            take
        );
    }

    res.status(200).json({
        status: "success",
        page: page,
        pagesCount: pagesCount,
        data: courses
    });
});

export const createCourseReview = catchAsync(async (req, res, next) => {
    const review = CourseReviewSchema.parse(req.body);
    const subdomain = req.params.organization;
    const courseCode = req.params.courseCode;
    const userID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    const toxicity = await checkToxicity(review.review);
    // console.log(toxicity);

    if (toxicity > 0.7) {
        throw new AppError(
            "Your review violated our guidelines. Not posted. Warning issued. Please review the guidelines.",
            400
        );
    }

    // Check if the user has already reviewed the course
    const userReviewedCourses = await courseModel.getUserReviewedCourses(
        subdomain,
        courseCode,
        userID
    );

    // console.log(userReviewedCourses?.reviewedCourses);

    if (
        userReviewedCourses &&
        userReviewedCourses.reviewedCourses.includes(courseCode)
    ) {
        throw new AppError("You have already reviewed this course!", 400);
    }

    // Get the sentiment score of the review text from the sentiment analysis service
    const sentimentScore = await getSentiment(review.review);
    // const sentimentScore = Math.random() * 10;

    // Calculate the rating of the review using the sentiment score
    let rating: number;
    if (review.rating) {
        rating = (sentimentScore + review.rating) / 2;
    } else {
        rating = sentimentScore;
    }

    // Update the course rating in the database
    const newRating = await courseModel.updateCourseRating(
        subdomain,
        userID,
        courseCode,
        rating
    );

    res.status(201).json({
        status: "success",
        data: newRating
    });
});
