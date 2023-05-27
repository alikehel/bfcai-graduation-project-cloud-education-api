import { Router } from "express";

import {
    createCourse,
    createCourseReview,
    deleteCourse,
    getAllCourses,
    getCourse,
    updateCourse
} from "../controllers/courses.controller";

import { courseExist } from "../middlewares/courseExist.middleware";
import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = Router();

router.route("/:organization/courses").get(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    getAllCourses
    /*
        #swagger.tags = ['Courses Routes']

        #swagger.description = 'Must be a teacher, student or admin to get the courses'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.parameters['page'] = {
            in: 'query',
            description: 'Page Number',
            required: false
        }

        #swagger.responses[200-1] = {
            description: 'Got all courses',
            schema: {
                status: "success",
                data: [
                    {
                        name: "IOT",
                        description: "Course Description",
                        code: "cs50",
                        category: "CS",
                        isActive: false,
                        prerequisites: ["cs50","cs60"],
                        "createdAt": "2023-05-09T18:34:12.878Z",
                        "updatedAt": "2023-05-09T18:34:12.878Z",
                        "rating": 0,
                        "ratingCount": 0
                    },
                    {
                        name: "IOT",
                        description: "Course Description",
                        code: "cs50",
                        category: "CS",
                        isActive: false,
                        prerequisites: ["cs50","cs60"],
                        "createdAt": "2023-05-09T18:34:12.878Z",
                        "updatedAt": "2023-05-09T18:34:12.878Z",
                        "rating": 0,
                        "ratingCount": 0
                    }
                ]
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant get the courses data',
            schema: {
                status: "error",
                message: 'Cant get the courses data'
            }
        }
    */
);

router.route("/:organization/courses").post(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    createCourse
    /*
        #swagger.tags = ['Courses Routes']

        #swagger.description = 'Must be a teacher or admin to create a course'

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
                            name: {
                                type: "string",
                                example: "Internet Of Things",
                            },
                            description: {
                                type: "string",
                                example: "Course Description",
                            },
                            code: {
                                type: "string",
                                example: "cs10",
                            },
                            category: {
                                type: "string",
                                example: "IS",
                            },
                            isActive: {
                                type: "boolean",
                                description: "Course status",
                                example: false,
                                required: false
                            },
                            prerequisites: {
                                type: "array",
                                example: ["cs50","cs60"],
                                required: false
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[201-1] = {
            description: 'Course Created Successfully',
            schema: {
                status: "success",
                data: {
                    name: "IOT",
                    description: "Course Description",
                    code: "cs50",
                    category: "CS",
                    isActive: false,
                    prerequisites: ["cs50","cs60"],
                    "createdAt": "2023-05-09T18:34:12.878Z",
                    "updatedAt": "2023-05-09T18:34:12.878Z",
                    "rating": 0,
                    "ratingCount": 0
                }
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant create the course',
            schema: {
                status: "error",
                message: 'Cant create the course'
            }
        }
    */
);

router.route("/:organization/courses/:courseCode").get(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    courseExist,
    getCourse
    /*
        #swagger.tags = ['Courses Routes']

        #swagger.description = 'Must be a teacher, student or admin to get the course'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.parameters['courseCode'] = {
            in: 'path',
            description: 'Course Code',
            required: true
        }

        #swagger.responses[200-1] = {
            description: 'Got the course data',
            schema: {
                status: "success",
                data: {
                    name: "IOT",
                    description: "Course Description",
                    code: "cs50",
                    category: "CS",
                    isActive: false,
                    prerequisites: ["cs50","cs60"],
                    "createdAt": "2023-05-09T18:34:12.878Z",
                    "updatedAt": "2023-05-09T18:34:12.878Z",
                    "rating": 0,
                    "ratingCount": 0
                }
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant get the course data',
            schema: {
                status: "error",
                message: 'Cant get the course data'
            }
        }
    */
);

router.route("/:organization/courses/:courseCode").patch(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    courseExist,
    updateCourse
    /*
        #swagger.tags = ['Courses Routes']

        #swagger.description = 'Must be a teacher or admin to update a course'

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
                            name: {
                                type: "string",
                                example: "Internet Of Things",
                                required: false
                            },
                            description: {
                                type: "string",
                                example: "Course Description",
                                required: false
                            },
                            code: {
                                type: "string",
                                example: "cs10",
                                required: false
                            },
                            category: {
                                type: "string",
                                example: "IS",
                                required: false
                            },
                            isActive: {
                                type: "boolean",
                                description: "Course status",
                                example: false,
                                required: false,
                            },
                            prerequisites: {
                                type: "array",
                                example: ["cs50","cs60"],
                                required: false
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[201-1] = {
            description: 'Course Updated Successfully',
            schema: {
                status: "success",
                data: {
                    name: "IOT",
                    description: "Course Description",
                    code: "cs50",
                    category: "CS",
                    isActive: false,
                    prerequisites: ["cs50","cs60"],
                    "createdAt": "2023-05-09T18:34:12.878Z",
                    "updatedAt": "2023-05-09T18:34:12.878Z",
                    "rating": 0,
                    "ratingCount": 0
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
            description: 'Cant update the course',
            schema: {
                status: "error",
                message: 'Cant update the course'
            }
        }
    */
);

router.route("/:organization/courses/:courseCode").delete(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    courseExist,
    deleteCourse
    /*
        #swagger.tags = ['Courses Routes']

        #swagger.description = 'Must be a teacher or admin to delete a course'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.parameters['courseCode'] = {
            in: 'path',
            description: 'Course Code',
            required: true
        }

        #swagger.responses[200-1] = {
            description: 'Course deleted Successfully',
            schema: {
                status: "success",
                message: "Course deleted successfully"
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
            description: 'Cant delete the course',
            schema: {
                status: "error",
                message: 'Cant delete the course'
            }
        }
    */
);

router.route("/:organization/courses/:courseCode/reviews").post(
    orgExist,
    isLoggedIn,
    isAutherized(["STUDENT", "TEACHER", "ADMIN"]),
    courseExist,
    createCourseReview
    /*
        #swagger.tags = ['Courses Routes']

        #swagger.description = 'Must be a student to create a course review'

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
                            rating: {
                                type: "number",
                                example: 8.5,
                                required: false
                            },
                            review: {
                                type: "string",
                                example: "This course is very good and I recommend it to everyone",
                            }
                        }
                    }
                }
            }
        }

        #swagger.responses[201-1] = {
            description: 'Course Review Created Successfully',
            schema: {
                status: "success",
                data: {
                    rating: 8.5
                }
            }
        }

        #swagger.responses[500-1] = {
            description: 'Cant update the courses rating',
            schema: {
                status: "error",
                message: 'Cant update the courses rating'
            }
        }

        #swagger.responses[500-2] = {
            description: 'Something went wrong with the sentiment analyzer ai api',
            schema: {
                status: "error",
                message: 'Something went wrong with the sentiment analyzer ai api'
            }
        }
    */
);

export default router;
