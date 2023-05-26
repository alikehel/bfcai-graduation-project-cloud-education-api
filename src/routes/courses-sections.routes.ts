import { Router } from "express";

import {
    createCourseSection,
    deleteCourseSection,
    getAllCourseSectionsTitles,
    getCourseSection,
    updateCourseSection
} from "../controllers/courses-sections.controller";

import { courseExist } from "../middlewares/courseExist.middleware";
import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = Router();

/*

GET      -   /:courseCode/sections                        -    Get all sections titles
POST     -   /:courseCode/sections                        -    Add new section without content

GET      -   /:courseCode/sections/:sectionOrder          -    Get a section content + title
PATCH    -   /:courseCode/sections/:sectionOrder          -    Update a section content or title
DELETE   -   /:courseCode/sections/:sectionOrder          -    delete a whole section

POST     -   /:courseCode/sections/:sectionOrder/reorder  -    reorder the section

*/

router.route("/:organization/courses/:courseCode/sections").get(
    orgExist,
    courseExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    getAllCourseSectionsTitles
    /*
        #swagger.tags = ['Courses Sections Routes']

        #swagger.description = 'Must be a teacher, student or admin to get the course sections titles'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.responses[200-1] = {
            description: 'Got all course sections titles',
            schema: {
                status: "success",
                data: [
                    {
                        title: "Lecture 1",
                        order: 1,
                    },
                    {
                        title: "Lecture 2",
                        order: 2,
                    }
                ]
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant get the course sections titles',
            schema: {
                status: "error",
                message: 'Cant get the course sections titles'
            }
        }
    */
);

router.route("/:organization/courses/:courseCode/sections").post(
    orgExist,
    courseExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    createCourseSection
    /*
        #swagger.tags = ['Courses Sections Routes']

        #swagger.description = 'Must be a teacher or admin to create a course section'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            title: {
                                type: "string",
                                example: "Lecture 1",
                            },
                            order: {
                                type: "number",
                                example: 1,
                                required: false
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[201-1] = {
            description: 'Course Section Created Successfully',
            schema: {
                status: "success",
                data: {
                    title: "Lecture 1",
                    order: 1
                }
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant create the course section',
            schema: {
                status: "error",
                message: 'Cant create the course section'
            }
        }
    */
);

router.route("/:organization/courses/:courseCode/sections/:sectionOrder").get(
    orgExist,
    courseExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    getCourseSection
    /*
        #swagger.tags = ['Courses Sections Routes']

        #swagger.description = 'Must be a teacher, student or admin to get the course section content'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.parameters['courseCode'] = {
            in: 'path',
            description: 'Course Code',
            required: true
        }

        #swagger.responses[200-1] = {
            description: 'Got the course section content',
            schema: {
                status: "success",
                data: {
                    title: "Lecture 1",
                    order: 1,
                    content: "EditorJS Content",
                }
            }
        }

        #swagger.responses[404-1] = {
            description: 'Course section not found!',
            schema: {
                status: "fail",
                message: "Course section not found!"
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant get the course section content',
            schema: {
                status: "error",
                message: 'Cant get the course section content'
            }
        }
    */
);

router.route("/:organization/courses/:courseCode/sections/:sectionOrder").patch(
    orgExist,
    courseExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    updateCourseSection
    /*
        #swagger.tags = ['Courses Sections Routes']

        #swagger.description = 'Must be a teacher or admin to update the course section data'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            title: {
                                type: "string",
                                example: "Lecture 1",
                                required: false
                            },
                            content: {
                                type: "stringified json",
                                example: "stringified EditorJS Content",
                                required: false
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[201-1] = {
            description: 'Course Section Data Updated Successfully',
            schema: {
                status: "success",
                data: {
                    title: "Lecture 1",
                    content: "EditorJS Content",
                }
            }
        }

        #swagger.responses[401-1] = {
            description: 'You are not the owner of this course!',
            schema: {
                status: "fail",
                message: "You are not the owner of this course!"
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant update the course section data',
            schema: {
                status: "error",
                message: 'Cant update the course section data'
            }
        }
    */
);

router
    .route("/:organization/courses/:courseCode/sections/:sectionOrder")
    .delete(
        orgExist,
        courseExist,
        isLoggedIn,
        isAutherized(["ADMIN", "TEACHER"]),
        deleteCourseSection
        /*
        #swagger.tags = ['Courses Sections Routes']

        #swagger.description = 'Must be a teacher or admin to delete the course section'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.parameters['courseCode'] = {
            in: 'path',
            description: 'Course Code',
            required: true
        }

        #swagger.responses[200-1] = {
            description: 'Course Section deleted Successfully',
            schema: {
                status: "success",
                message: "Course Section deleted successfully"
            }
        }

        #swagger.responses[401-1] = {
            description: 'You are not the owner of this course!',
            schema: {
                status: "fail",
                message: "You are not the owner of this course!"
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant delete the course section',
            schema: {
                status: "error",
                message: 'Cant delete the course section'
            }
        }
    */
    );

export default router;
