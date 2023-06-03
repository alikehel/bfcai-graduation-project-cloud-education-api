import { CourseSection, Prisma, PrismaClient } from "@prisma/client";
// import organizations from "../database/seed/data/organizations";
import { UUID } from "crypto";
import AppError from "../utils/AppError.util";
import {
    CourseSectionCreateSchema,
    CourseSectionCreateType,
    CourseSectionUpdateSchema,
    CourseSectionUpdateType
} from "../validation";

const prisma = new PrismaClient();

export class CourseSectionModel {
    async getAllCourseSectionsTitles(subdomain: string, courseCode: string) {
        try {
            const courseSectionsTitles = await prisma.courseSection.findMany({
                select: {
                    title: true,
                    order: true
                },
                where: {
                    Course: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                orderBy: {
                    order: "asc"
                }
            });
            return courseSectionsTitles;
        } catch (err) {
            throw err;
        }
    }

    async createSection(
        courseSection: CourseSectionCreateType,
        subdomain: string,
        courseCode: string
    ): Promise<CourseSectionCreateType> {
        try {
            const lastSectionOrder = await prisma.courseSection.findFirst({
                where: {
                    Course: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                select: {
                    order: true
                },
                orderBy: {
                    order: "desc"
                }
            });

            if (lastSectionOrder) {
                courseSection.order = lastSectionOrder.order + 1;
            } else {
                courseSection.order = 1;
            }

            const createdCourseSection = await prisma.courseSection.create({
                data: {
                    ...courseSection,
                    order: courseSection.order, // Provide a default value if undefined
                    Course: {
                        connect: {
                            codeSubdomain: {
                                code: courseCode,
                                organizationSubdomain: subdomain
                            }
                        }
                    }
                },
                select: {
                    title: true,
                    order: true
                }
            });
            return createdCourseSection;
        } catch (err) {
            throw err;
        }
    }

    async getCourseSectionContent(
        subdomain: string,
        courseCode: string,
        sectionOrder: number
    ) {
        try {
            const courseSectionContent = await prisma.courseSection.findFirst({
                where: {
                    Course: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    },
                    order: sectionOrder
                },
                select: {
                    title: true,
                    order: true,
                    content: true,
                    Course: {
                        select: {
                            userId: true
                        }
                    }
                }
            });

            const ownerEmail = await prisma.user.findUnique({
                where: {
                    id: courseSectionContent?.Course?.userId
                },
                select: {
                    email: true
                }
            });

            const { Course, ...courseSectionContentWithOwner } = {
                ...courseSectionContent,
                ownerEmail: ownerEmail?.email
            };

            return courseSectionContentWithOwner;
        } catch (err) {
            throw err;
        }
    }

    async updateCourseSection(
        courseSectionData: CourseSectionUpdateType,
        subdomain: string,
        courseCode: string,
        sectionOrder: number
    ) {
        try {
            const courseId = (await prisma.course.findUnique({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                select: {
                    id: true
                }
            })) as { id: UUID };
            const updatedCourseSectionData = await prisma.courseSection.update({
                where: {
                    // Course: {
                    //     code: courseCode,
                    //     organizationSubdomain: subdomain
                    // },
                    // order: sectionOrder
                    courseOrder: {
                        courseId: courseId.id,
                        order: sectionOrder
                    }
                },
                data: {
                    ...courseSectionData,
                    content: JSON.stringify(courseSectionData.content)
                },
                select: {
                    title: true,
                    content: true
                }
            });
            return updatedCourseSectionData;
        } catch (err) {
            throw err;
        }
    }

    async deleteCourseSection(
        subdomain: string,
        courseCode: string,
        sectionOrder: number
    ): Promise<boolean> {
        try {
            const courseId = (await prisma.course.findUnique({
                where: {
                    codeSubdomain: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                select: {
                    id: true
                }
            })) as { id: UUID };
            await prisma.courseSection.delete({
                where: {
                    // Course: {
                    //     code: courseCode,
                    //     organizationSubdomain: subdomain
                    // },
                    // order: sectionOrder
                    courseOrder: {
                        courseId: courseId.id,
                        order: sectionOrder
                    }
                }
            });

            // Update the order of the sections
            const courseSections = await prisma.courseSection.findMany({
                where: {
                    Course: {
                        code: courseCode,
                        organizationSubdomain: subdomain
                    }
                },
                select: {
                    id: true,
                    order: true
                },
                orderBy: {
                    order: "asc"
                }
            });
            for (let i = 0; i < courseSections.length; i++) {
                await prisma.courseSection.update({
                    where: {
                        id: courseSections[i].id
                    },
                    data: {
                        order: i + 1
                    }
                });
            }

            return true;
        } catch (err) {
            throw err;
        }
    }
}
