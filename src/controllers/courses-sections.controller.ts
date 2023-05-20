import { json } from "body-parser";
import { CourseSectionModel } from "../models/course-section.model";
import { CourseModel } from "../models/course.model";
import { UserModel } from "../models/user.model";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
import {
    CourseSectionCreateSchema,
    CourseSectionCreateType,
    CourseSectionUpdateSchema,
    CourseSectionUpdateType
} from "../validation";

const courseModel = new CourseModel();
const userModel = new UserModel();
const courseSectionModel = new CourseSectionModel();

export const getAllCourseSectionsTitles = catchAsync(async (req, res, next) => {
    const subdomain = req.params.organization;
    const courseCode = req.params.courseCode;

    const courseSectionstitles =
        await courseSectionModel.getAllCourseSectionsTitles(
            subdomain,
            courseCode
        );

    res.status(200).json({
        status: "success",
        data: courseSectionstitles
    });
});

export const createCourseSection = catchAsync(async (req, res, next) => {
    const courseSectionTitle = CourseSectionCreateSchema.parse(req.body);
    const subdomain = req.params.organization;
    const courseCode = req.params.courseCode;

    const createdCourseSection = await courseSectionModel.createSection(
        { ...courseSectionTitle },
        subdomain,
        courseCode
    );

    res.status(201).json({
        status: "success",
        data: createdCourseSection
    });
});

export const getCourseSection = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const subdomain = req.params.organization;
    const sectionOrder = parseInt(req.params.sectionOrder);

    const courseSectionContent =
        await courseSectionModel.getCourseSectionContent(
            subdomain,
            courseCode,
            sectionOrder
        );

    if (!courseSectionContent) {
        throw new AppError("Course section not found", 404);
    }

    res.status(200).json({
        status: "success",
        data: courseSectionContent
    });
});

export const updateCourseSection = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const courseSectionData = CourseSectionUpdateSchema.parse(req.body);
    const subdomain = req.params.organization;
    const sectionOrder = parseInt(req.params.sectionOrder);

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

    // TEST

    // const sectionContent = {
    //     time: 1636709084205,
    //     blocks: [
    //         {
    //             id: "nHmgVVvDk2",
    //             type: "paragraph",
    //             data: {
    //                 text: "A target audience is a group of people identified as being likely customers of a business. Identifying your target audience as a business can help craft marketing strategies and define your core customers. Instead of spending money and resources trying to cater to every consumer, defining a target audience allows for more intentional and personal outreach to those most likely to purchase your product or service"
    //             }
    //         },
    //         {
    //             id: "2erhSLrJBE",
    //             type: "header",
    //             data: { text: "The Problem Cycle", level: 2 }
    //         },
    //         {
    //             id: "qOIbZ3zlEM",
    //             type: "paragraph",
    //             data: {
    //                 text: "Truly identifying a problem means looking deeper at the symptoms, the customer, the impact, the alternatives, the opportunity, and the relationships between them, while avoiding the “solution bias”"
    //             }
    //         },
    //         {
    //             id: "KeG_poKY6T",
    //             type: "paragraph",
    //             data: {
    //                 text: "<b>Why does an entrepreneur need to identify the problem?</b>"
    //             }
    //         },
    //         {
    //             id: "xS0EFJQ-y5",
    //             type: "list",
    //             data: {
    //                 style: "ordered",
    //                 items: [
    //                     {
    //                         content:
    //                             "Your business plan needs a problem statement because every great company starts by solving an important problem.",
    //                         items: []
    //                     },
    //                     {
    //                         content:
    //                             "The more accurately you articulate the problem, the more valuable the solution will be. A well-articulated problem makes the value of your solution and your entire plan 10x more effective.",
    //                         items: []
    //                     },
    //                     {
    //                         content:
    //                             "It’s what intrigues people about the rest of your business and ultimately becomes the focal point for everything you build.",
    //                         items: []
    //                     },
    //                     {
    //                         content:
    //                             "It tells more of a story, and provides an emotional connection to the solution.",
    //                         items: []
    //                     }
    //                 ]
    //             }
    //         },
    //         {
    //             id: "YCZnoSooIk",
    //             type: "image",
    //             data: {
    //                 url: "https://dashboard.belong.education/Pro.png",
    //                 caption: "Figure: The problem cycle",
    //                 withBorder: false,
    //                 withBackground: false,
    //                 stretched: false
    //             }
    //         },
    //         {
    //             id: "4eU4BZkGm8",
    //             type: "paragraph",
    //             data: { text: "Resources" }
    //         },
    //         {
    //             id: "MzCW6WfkQW",
    //             type: "paragraph",
    //             data: {
    //                 text: '<a href="https://medium.com/textbook-ventures/entrepreneurship-101-startup-basics-part-1-d14e8144fb93">Enterpreneurship 101 | Medium</a>'
    //             }
    //         },
    //         {
    //             id: "EqKwIcnUzf",
    //             type: "paragraph",
    //             data: {
    //                 text: '<a href="https://www.entrepreneur.com/article/223288">Startup basics</a>'
    //             }
    //         },
    //         {
    //             id: "54UdhckhYG",
    //             type: "paragraph",
    //             data: { text: "<b>Steps to identify a problem-</b>" }
    //         },
    //         {
    //             id: "eiUUZQ42R5",
    //             type: "paragraph",
    //             data: {
    //                 text: "Step 1 : Pick the problem that you relate to the most- pick 2-3 such problem areas"
    //             }
    //         },
    //         {
    //             id: "vM9_RaJVH1",
    //             type: "paragraph",
    //             data: {
    //                 text: "Step 2 : Pump up the pain-The more painful the problem, the more powerful the solution"
    //             }
    //         },
    //         {
    //             id: "K7q8j5MBWY",
    //             type: "paragraph",
    //             data: {
    //                 text: "Step 3 : Make your story relatable-The more your audience can relate to your story, the better they will understand it and want to connect to it."
    //             }
    //         },
    //         {
    //             id: "7vvrhzd8B3",
    //             type: "paragraph",
    //             data: {
    //                 text: "<b>Note:</b>&nbsp;While choosing your problem, it's great to research various industries, pick key trends therein and probably also look at which industry has maximum booming potential currently."
    //             }
    //         },
    //         {
    //             id: "9ij7m5uTwH",
    //             type: "paragraph",
    //             data: { text: "<b>Identifying the right problem-</b>" }
    //         },
    //         {
    //             id: "cGyfFLEHev",
    //             type: "list",
    //             data: {
    //                 style: "unordered",
    //                 items: [
    //                     {
    //                         content:
    //                             "The real talent in all entrepreneurship—not only in tech startups—is finding the right problem, not building the right solution",
    //                         items: []
    //                     },
    //                     {
    //                         content:
    //                             "Identifying the root cause, not the symptoms, is essential to building the right solution. Understand the complexity of the problem",
    //                         items: []
    //                     },
    //                     {
    //                         content:
    //                             "Go from local to global- build the best solution for a specific group of customers first, then build another average solution for a larger market",
    //                         items: []
    //                     },
    //                     {
    //                         content:
    //                             "Consider the emotional and quantitative Impact of the problem.",
    //                         items: []
    //                     }
    //                 ]
    //             }
    //         },
    //         {
    //             id: "QL0v-nteAy",
    //             type: "paragraph",
    //             data: { text: "<b>Resources</b>" }
    //         },
    //         {
    //             id: "OuDJq2A4D1",
    //             type: "paragraph",
    //             data: {
    //                 text: '<a href="https://www.startups.com/library/expert-advice/write-best-business-problem-statement">Writing business problem statements</a>'
    //             }
    //         }
    //     ],
    //     version: "2.22.2"
    // };

    // courseSectionData.content = JSON.stringify(sectionContent);

    // END TEST

    const updatedCourseSection = await courseSectionModel.updateCourseSection(
        { ...courseSectionData },
        subdomain,
        courseCode,
        sectionOrder
    );

    res.status(201).json({
        status: "success",
        data: updatedCourseSection
    });
});

export const deleteCourseSection = catchAsync(async (req, res, next) => {
    const courseCode = req.params.courseCode;
    const subdomain = req.params.organization;
    const sectionOrder = parseInt(req.params.sectionOrder);

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

    const deleted = await courseSectionModel.deleteCourseSection(
        subdomain,
        courseCode,
        sectionOrder
    );

    res.status(200).json({
        status: "success",
        message: "Course section deleted successfully"
    });
});
