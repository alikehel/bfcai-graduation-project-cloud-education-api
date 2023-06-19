import { PrismaClient } from "@prisma/client";
// import organizations from "../database/seed/data/organizations";
import { UUID } from "crypto";
// import AppError from "../utils/AppError.util";
import {
    CourseSectionCreateType,
    CourseSectionUpdateType
} from "../validation";

const prisma = new PrismaClient();

export class CourseSectionModel {
    async getAllCourseSectionsTitles(subdomain: string, courseCode: string) {
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
    }

    async createSection(
        courseSection: CourseSectionCreateType,
        subdomain: string,
        courseCode: string
    ): Promise<CourseSectionCreateType> {
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
    }

    async getCourseSectionContent(
        subdomain: string,
        userId: string,
        courseCode: string,
        sectionOrder: number
    ) {
        const userReviewedCourses = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                reviewedCourses: true
            }
        });
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

        if (!courseSectionContent) {
            return null;
        }

        const ownerEmail = await prisma.user.findUnique({
            where: {
                id: courseSectionContent?.Course?.userId
            },
            select: {
                email: true
            }
        });

        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { Course, ...courseSectionContentWithOwner } = {
            ...courseSectionContent,
            ownerEmail: ownerEmail?.email
        };

        if (userReviewedCourses?.reviewedCourses.includes(courseCode)) {
            return {
                ...courseSectionContentWithOwner,
                isReviewed: true
            };
        } else {
            return {
                ...courseSectionContentWithOwner,
                isReviewed: false
            };
        }
    }

    async updateCourseSection(
        courseSectionData: CourseSectionUpdateType,
        subdomain: string,
        courseCode: string,
        sectionOrder: number
    ) {
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
    }

    async deleteCourseSection(
        subdomain: string,
        courseCode: string,
        sectionOrder: number
    ): Promise<boolean> {
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
    }
}
