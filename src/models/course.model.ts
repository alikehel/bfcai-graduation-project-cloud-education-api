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
                    isActive: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true,
                    prerequisites: {
                        select: {
                            code: true,
                            name: true
                        }
                    }
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
    ) {
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
                    isActive: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true,
                    prerequisites: {
                        select: {
                            code: true,
                            name: true
                        }
                    }
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
                    isActive: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true,
                    prerequisites: {
                        select: {
                            code: true,
                            name: true
                        }
                    }
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
                where: { organizationSubdomain: subdomain },
                orderBy: {
                    name: "asc"
                },
                select: {
                    name: true,
                    description: true,
                    code: true,
                    isActive: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true,
                    prerequisites: {
                        select: {
                            code: true,
                            name: true
                        }
                    }
                }
            });
            return courseData;
        } catch (err) {
            throw err;
        }
    }

    async getAllCourseDataForUser(
        subdomain: string,
        userID: string,
        skip: number,
        take: number
    ) {
        try {
            const courseData = await prisma.course.findMany({
                skip: skip,
                take: take,
                where: {
                    organizationSubdomain: subdomain,
                    users: {
                        some: {
                            id: userID
                        }
                    }
                },
                orderBy: {
                    name: "asc"
                },
                select: {
                    name: true,
                    description: true,
                    code: true,
                    isActive: true,
                    category: true,
                    createdAt: true,
                    updatedAt: true,
                    rating: true,
                    ratingCount: true,
                    prerequisites: {
                        select: {
                            code: true,
                            name: true
                        }
                    }
                }
            });
            return courseData;
        } catch (err) {
            throw err;
        }
    }

    async getCoursesCount(subdomain: string) {
        try {
            const count = await prisma.course.count({
                where: {
                    organizationSubdomain: subdomain
                }
            });
            return count;
        } catch (err) {
            throw err;
        }
    }

    async getCoursesCountForUser(subdomain: string, userID: string) {
        try {
            const count = await prisma.course.count({
                where: {
                    organizationSubdomain: subdomain,
                    users: {
                        some: {
                            id: userID
                        }
                    }
                }
            });
            return count;
        } catch (err) {
            throw err;
        }
    }

    async updateCourseRating(
        subdomain: string,
        userID: string,
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

            await prisma.user.update({
                where: {
                    id: userID
                },
                data: {
                    reviewedCourses: {
                        push: courseCode
                    }
                }
            });

            return updatedNewRating;
        } catch (err) {
            throw err;
        }
    }

    async getUserReviewedCourses(
        subdomain: string,
        courseCode: string,
        userID: string
    ) {
        try {
            const userReviewedCourses = await prisma.user.findUnique({
                where: {
                    id: userID
                },
                select: {
                    reviewedCourses: true
                }
            });
            return userReviewedCourses;
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

    async getAllCoursesCodes(subdomain: string, exclude: string) {
        try {
            const coursesCodes = await prisma.course.findMany({
                where: {
                    organizationSubdomain: subdomain,
                    code: { not: exclude }
                },
                orderBy: {
                    name: "asc"
                },
                select: {
                    code: true,
                    name: true
                }
            });
            return coursesCodes;
        } catch (err) {
            throw err;
        }
    }
}
