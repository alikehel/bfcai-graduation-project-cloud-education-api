import { json } from "body-parser";
// import { CourseSectionModel } from "../models/course-section.model";
// import { CourseModel } from "../models/course.model";
import { CourseSectionCommentModel } from "../models/course-section-comment.model";
import { UserModel } from "../models/user.model";
import { checkToxicity } from "../services/ai.service";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
import {
    CourseSectionCommentCreateSchema,
    CourseSectionCommentCreateType,
    CourseSectionCommentUpdateSchema,
    CourseSectionCommentUpdateType
} from "../validation";

// const courseModel = new CourseModel();
const userModel = new UserModel();
// const courseSectionModel = new CourseSectionModel();
const courseSectionCommentModel = new CourseSectionCommentModel();

export const getAllCourseSectionComments = catchAsync(
    async (req, res, next) => {
        const subdomain = req.params.organization;
        const courseCode = req.params.courseCode;
        const sectionOrder = +req.params.sectionOrder;

        let page = 1;
        if (req.query.page) {
            page = +req.query.page;
        }
        const take = page * 10;
        const skip = (page - 1) * 10;
        // if (Number.isNaN(offset)) {
        //     skip = 0;
        // }

        const courseSectionComments =
            await courseSectionCommentModel.getAllCourseSectionComments(
                subdomain,
                courseCode,
                sectionOrder,
                skip,
                take
            );

        res.status(200).json({
            status: "success",
            data: courseSectionComments
        });
    }
);

export const createCourseSectionComment = catchAsync(async (req, res, next) => {
    const courseSectionComment = CourseSectionCommentCreateSchema.parse(
        req.body
    );
    const subdomain = req.params.organization;
    const courseCode = req.params.courseCode;
    const sectionOrder = +req.params.sectionOrder;
    const userID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    const toxicity = await checkToxicity(courseSectionComment.content);
    // console.log(toxicity);

    if (toxicity > 0.7) {
        throw new AppError(
            "Your comment violated our guidelines. Not posted. Warning issued. Please review the guidelines.",
            400
        );
    }

    const createdCourseSection = await courseSectionCommentModel.createComment(
        { ...courseSectionComment },
        subdomain,
        courseCode,
        sectionOrder,
        userID
    );

    res.status(201).json({
        status: "success",
        data: createdCourseSection
    });
});

export const updateCourseSectionComment = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const courseSectionCommentData = CourseSectionCommentUpdateSchema.parse(
        req.body
    );
    const subdomain = req.params.organization;
    const sectionOrder = parseInt(req.params.sectionOrder);
    const commentId = req.params.commentId;

    const userID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    // Check if the current user is the owner of the comment
    if (
        (await courseSectionCommentModel.getOwner(
            subdomain,
            courseCode,
            sectionOrder,
            userID
        )) !== userID
    ) {
        throw new AppError("You are not the owner of this comment!", 401);
    }

    const toxicity = await checkToxicity(courseSectionCommentData.content);
    // console.log(toxicity);

    if (toxicity > 0.7) {
        throw new AppError(
            "Your comment violated our guidelines. Not posted. Warning issued. Please review the guidelines.",
            400
        );
    }

    const updatedCourseSectionComment =
        await courseSectionCommentModel.updateCourseSectionComment(
            { ...courseSectionCommentData },
            subdomain,
            courseCode,
            sectionOrder,
            commentId
        );

    res.status(201).json({
        status: "success",
        data: updatedCourseSectionComment
    });
});

export const deleteCourseSectionComment = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const subdomain = req.params.organization;
    const sectionOrder = parseInt(req.params.sectionOrder);
    const commentId = req.params.commentId;

    const userID = (await userModel.getUserID(
        res.locals.user.email,
        subdomain
    )) as string;

    // Check if the current user is the owner of the comment
    if (
        (await courseSectionCommentModel.getOwner(
            subdomain,
            courseCode,
            sectionOrder,
            userID
        )) !== userID
    ) {
        throw new AppError("You are not the owner of this comment!", 401);
    }

    const deleted = await courseSectionCommentModel.deleteCourseSectionComment(
        subdomain,
        courseCode,
        sectionOrder,
        commentId
    );

    res.status(200).json({
        status: "success",
        message: "Comment deleted successfully"
    });
});
