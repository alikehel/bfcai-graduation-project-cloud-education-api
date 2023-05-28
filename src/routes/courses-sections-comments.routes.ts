import { Router } from "express";

import {
    createCourseSectionComment,
    deleteCourseSectionComment,
    getAllCourseSectionComments,
    updateCourseSectionComment
} from "../controllers/courses-sections-comments.controller";

import { courseExist } from "../middlewares/courseExist.middleware";
import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = Router();

/*

GET      -   /:courseCode/sections/:sectionOrder/comments               -    Get a section comments
POST     -   /:courseCode/sections/:sectionOrder/comments               -    Add new comment
PATCH    -   /:courseCode/sections/:sectionOrder/comments/:commentId    -    Update a section comment
DELETE   -   /:courseCode/sections/:sectionOrder/comments/:commentId    -    delete a comment

*/

router
    .route("/:organization/courses/:courseCode/sections/:sectionOrder/comments")
    .get(
        orgExist,
        courseExist,
        isLoggedIn,
        isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
        getAllCourseSectionComments
        /*
        #swagger.tags = ['Courses Sections Comment Routes']

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.parameters['page'] = {
            in: 'query',
            description: 'Page Number',
            required: false
        }

        #swagger.responses[200-1] = {
            description: 'Get all course section comments',
            schema: {
                status: "success",
                data: [
                    {
                        id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                        createdAt: "2023-05-28T14:16:34.986Z",
                        updatedAt: "2023-05-28T14:16:34.986Z",
                        content: "comment content",
                        user: {
                            id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                            firstName: "Ali",
                            lastName: "Kehel",
                            email: "ali@fci.bu.edu.eg",
                        }
                    },
                    {
                        id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                        createdAt: "2023-05-28T14:16:34.986Z",
                        updatedAt: "2023-05-28T14:16:34.986Z",
                        content: "comment content",
                        user: {
                            id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                            firstName: "Ali",
                            lastName: "Kehel",
                            email: "ali@fci.bu.edu.eg",
                        }
                    }
                ]
            }
        }
    */
    );

router
    .route("/:organization/courses/:courseCode/sections/:sectionOrder/comments")
    .post(
        orgExist,
        courseExist,
        isLoggedIn,
        isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
        createCourseSectionComment
        /*
        #swagger.tags = ['Courses Sections Comment Routes']

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
                            content: {
                                type: "string",
                                example: "comment content",
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[200-1] = {
            description: 'Comment Added Successfully',
            schema: {
                status: "success",
                data:{
                    id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                    createdAt: "2023-05-28T14:16:34.986Z",
                    updatedAt: "2023-05-28T14:16:34.986Z",
                    content: "comment content",
                    user: {
                        id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                        firstName: "Ali",
                        lastName: "Kehel",
                        email: "ali@fci.bu.edu.eg",
                    }
                }
            }
        }

        #swagger.responses[400-1] = {
            description: 'Your comment violated our guidelines. Not posted. Warning issued. Please review the guidelines.',
            schema: {
                status: "fail",
                message: 'Your comment violated our guidelines. Not posted. Warning issued. Please review the guidelines.'
            }
        }
    */
    );

router
    .route(
        "/:organization/courses/:courseCode/sections/:sectionOrder/comments/:commentId"
    )
    .patch(
        orgExist,
        courseExist,
        isLoggedIn,
        isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
        updateCourseSectionComment
        /*
        #swagger.tags = ['Courses Sections Comment Routes']

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
                            content: {
                                type: "string",
                                example: "comment content",
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[200-1] = {
            description: 'Comment Updated Successfully',
            schema: {
                status: "success",
                data:{
                    id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                    createdAt: "2023-05-28T14:16:34.986Z",
                    updatedAt: "2023-05-28T14:16:34.986Z",
                    content: "comment content",
                    user: {
                        id: "0fde5fd4-0f50-40fb-a50f-7c1f791f8168",
                        firstName: "Ali",
                        lastName: "Kehel",
                        email: "ali@fci.bu.edu.eg",
                    }
                }
            }
        }

        #swagger.responses[401-1] = {
            description: 'You are not the owner of this comment!',
            schema: {
                status: "fail",
                message: "You are not the owner of this comment!"
            }
        }

        #swagger.responses[400-1] = {
            description: 'Your comment violated our guidelines. Not posted. Warning issued. Please review the guidelines.',
            schema: {
                status: "fail",
                message: 'Your comment violated our guidelines. Not posted. Warning issued. Please review the guidelines.'
            }
        }
    */
    );

router
    .route(
        "/:organization/courses/:courseCode/sections/:sectionOrder/comments/:commentId"
    )
    .delete(
        orgExist,
        courseExist,
        isLoggedIn,
        isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
        deleteCourseSectionComment
        /*
        #swagger.tags = ['Courses Sections Comment Routes']

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.parameters['courseCode'] = {
            in: 'path',
            description: 'Course Code',
            required: true
        }

        #swagger.responses[200-1] = {
            description: 'Comment deleted successfully',
            schema: {
                status: "success",
                message: "Comment deleted successfully"
            }
        }

        #swagger.responses[401-1] = {
            description: 'You are not the owner of this comment!',
            schema: {
                status: "fail",
                message: "You are not the owner of this comment!"
            }
        }
    */
    );

export default router;
