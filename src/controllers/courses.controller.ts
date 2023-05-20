import { json } from "body-parser";
import { CourseModel } from "../models/course.model";
import { UserModel } from "../models/user.model";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
import {
    CourseCreateSchema,
    CourseCreateType,
    CourseUpdateSchema,
    CourseUpdateType
} from "../validation";

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
        data:  updatedCourse
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

    let page = 1;
    if (req.query.page) {
        page = +req.query.page;
    }
    const take = page * 10;
    const skip = (page - 1) * 10;
    // if (Number.isNaN(offset)) {
    //     skip = 0;
    // }

    const courses = await courseModel.getAllCourseData(subdomain, skip, take);

    res.status(200).json({
        status: "success",
        data: courses
    });
});
