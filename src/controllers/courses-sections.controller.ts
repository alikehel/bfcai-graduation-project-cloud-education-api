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

    // TEST
    let newCourseSectionContent = {
        ...courseSectionContent,
        content: JSON.parse(courseSectionContent.content as string)
    };

    res.status(200).json({
        status: "success",
        data: newCourseSectionContent
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

    // const sectionContent = [
    //     {
    //         id: "sheNwCUP5A",
    //         type: "header",
    //         data: {
    //             text: "In this lesson you will learn how to use the Editor.js",
    //             level: 1
    //         }
    //     },
    //     {
    //         type: "embed",
    //         data: {
    //             service: "youtube",
    //             source: "https://www.youtube.com/watch?v=kOgAe2fyrNg",
    //             embed: "https://www.youtube.com/embed/B9fmr1TpKHE",
    //             width: 580,
    //             height: 320,
    //             caption: "My Life"
    //         }
    //     },
    //     {
    //         id: "12iM3lqzcm",
    //         type: "paragraph",
    //         data: {
    //             text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
    //         }
    //     },
    //     {
    //         id: "fvZGuFXHmK",
    //         type: "header",
    //         data: {
    //             text: "Key features",
    //             level: 3
    //         }
    //     },
    //     {
    //         id: "xnPuiC9Z8M",
    //         type: "list",
    //         data: {
    //             style: "unordered",
    //             items: [
    //                 "It is a block-styled editor",
    //                 "It returns clean data output in JSON",
    //                 "Designed to be extendable and pluggable with a simple API"
    //             ]
    //         }
    //     },
    //     {
    //         id: "-MhwnSs3Dw",
    //         type: "header",
    //         data: {
    //             text: "What does it mean «block-styled editor»",
    //             level: 3
    //         }
    //     },
    //     {
    //         id: "Ptb9oEioJn",
    //         type: "paragraph",
    //         data: {
    //             text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
    //         }
    //     },
    //     {
    //         id: "-J7nt-Ksnw",
    //         type: "paragraph",
    //         data: {
    //             text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
    //         }
    //     },
    //     {
    //         id: "SzwhuyoFq6",
    //         type: "header",
    //         data: {
    //             text: "What does it mean clean data output",
    //             level: 3
    //         }
    //     },
    //     {
    //         id: "x_p-xddPzV",
    //         type: "paragraph",
    //         data: {
    //             text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
    //         }
    //     },
    //     {
    //         id: "6W5e6lkub-",
    //         type: "paragraph",
    //         data: {
    //             text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
    //         }
    //     },
    //     {
    //         id: "eD2kuEfvgm",
    //         type: "paragraph",
    //         data: {
    //             text: "Clean data is useful to sanitize, validate and process on the backend."
    //         }
    //     },
    //     {
    //         id: "N8bOHTfUCN",
    //         type: "delimiter",
    //         data: {}
    //     },
    //     {
    //         id: "IpKh1dMyC6",
    //         type: "paragraph",
    //         data: {
    //             text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
    //         }
    //     },
    //     {
    //         id: "FF1iyF3VwN",
    //         type: "image",
    //         data: {
    //             file: {
    //                 url: "https://codex.so/public/app/img/external/codex2x.png"
    //             },
    //             caption: "",
    //             withBorder: false,
    //             stretched: false,
    //             withBackground: false
    //         }
    //     }
    // ];

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
