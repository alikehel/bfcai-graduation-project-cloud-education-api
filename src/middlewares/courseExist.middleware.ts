import { CourseModel } from "../models/course.model";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";

const courseModel = new CourseModel();

export const courseExist = catchAsync(async (req, res, next) => {
    if (
        !(await courseModel.courseExist(
            req.params.organization,
            req.params.courseCode
        ))
    ) {
        return next(new AppError("Course not found", 404));
    }

    return next();
});
