import { Course, Prisma, PrismaClient } from "@prisma/client";
// import organizations from "../database/seed/data/organizations";
import AppError from "../utils/AppError.util";
import {
    CourseCreateSchema,
    CourseCreateType,
    CourseUpdateSchema,
    CourseUpdateType
} from "../validation";

const prisma = new PrismaClient();

export class CourseModel {
    async create(
        course: CourseCreateType,
        subdomain: string,
        ownerID: string
    ): Promise<CourseCreateType> {
        const { prerequisites, ...courseData } = course;
        const prerequisitesConnect = prerequisites?.map((el) => {
            return {
                codeSubdomain: {
                    code: el,
                    organizationSubdomain: subdomain
                }
            };
        });
        try {
            const createdCourse = await prisma.course.create({
                data: {
                    ...courseData,
                    organization: { connect: { subdomain: subdomain } },
                    owner: { connect: { id: ownerID } },
                    prerequisites: {
                        connect: prerequisitesConnect
                    }
                },
                select: {
                    name: true,
                    description: true,
                    code: true,
                    // prerequisiteId: null,
                    isActive: true,
                    category: true,
                    // organizationSubdomain: "bfcai",
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true,
                    prerequisites: {
                        select: {
                            code: true
                        }
                    }
                    // userId: "24c9704b-9aa9-45ae-9a10-aead10353741"
                }
            });
            const { prerequisites, ...createdCourseWithoutPrerequisites } =
                createdCourse;
            const newPrerequisites = prerequisites.map((el) => {
                return el.code;
            });
            const newCreatedCourse = {
                ...createdCourseWithoutPrerequisites,
                prerequisites: newPrerequisites
            };
            return newCreatedCourse;
        } catch (err) {
            throw err;
        }
    }

    async update(
        course: CourseUpdateType,
        subdomain: string,
        courseCode: string
    ): Promise<CourseUpdateType> {
        const { prerequisites, ...courseData } = course;
        const prerequisitesConnect = prerequisites?.map((el) => {
            return {
                codeSubdomain: {
                    code: el,
                    organizationSubdomain: subdomain
                }
            };
        });
        try {
            const updatedCourse = await prisma.course.update({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                data: {
                    ...courseData,
                    prerequisites: {
                        connect: prerequisitesConnect
                    }
                },
                select: {
                    name: true,
                    description: true,
                    code: true,
                    // prerequisiteId: null,
                    isActive: true,
                    category: true,
                    // organizationSubdomain: "bfcai",
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true
                    // userId: "24c9704b-9aa9-45ae-9a10-aead10353741"
                }
            });
            return updatedCourse;
        } catch (err) {
            throw err;
        }
    }

    async getOwner(subdomain: string, courseCode: string) {
        try {
            const course = (await prisma.course.findUnique({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                }
                // select: {
                //     userId: true
                // }
            })) as Course;
            return course.userId;
        } catch (err) {
            throw err;
        }
    }

    async delete(subdomain: string, courseCode: string): Promise<boolean> {
        try {
            await prisma.course.delete({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                }
            });
            return true;
        } catch (err) {
            throw err;
        }
    }

    async getCourseData(subdomain: string, courseCode: string) {
        try {
            const courseData = await prisma.course.findUnique({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                select: {
                    name: true,
                    description: true,
                    code: true,
                    // prerequisiteId: null,
                    isActive: true,
                    category: true,
                    // organizationSubdomain: "bfcai",
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true
                    // userId: "24c9704b-9aa9-45ae-9a10-aead10353741"
                }
            });
            return courseData;
        } catch (err) {
            throw err;
        }
    }

    async getAllCourseData(subdomain: string, skip: number, take: number) {
        try {
            const courseData = await prisma.course.findMany({
                skip: skip,
                take: take,
                where: {},
                orderBy: {
                    name: "asc"
                }
            });
            return courseData;
        } catch (err) {
            throw err;
        }
    }

    async updateCourseRating(
        subdomain: string,
        courseCode: string,
        rating: number
    ) {
        try {
            // Get the old rating
            const oldRating = (await prisma.course.findUnique({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                select: {
                    rating: true,
                    ratingCount: true
                }
            })) as { rating: number; ratingCount: number };

            // Calculate the new rating
            const newRating =
                (oldRating?.rating * oldRating?.ratingCount + rating) /
                (oldRating?.ratingCount + 1);

            // console.log(rating);
            // console.log(oldRating);
            // console.log(newRating);

            // Update or create the rating if it doesn't exist
            const updatedNewRating = await prisma.course.update({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                data: {
                    rating: newRating,
                    ratingCount: oldRating?.ratingCount + 1
                },
                select: {
                    rating: true,
                    ratingCount: true
                }
            });
            return updatedNewRating;
        } catch (err) {
            throw err;
        }
    }

    async courseExist(subdomain: string, courseCode: string) {
        try {
            const course = await prisma.course.findUnique({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                }
            });
            if (course) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    }
}
