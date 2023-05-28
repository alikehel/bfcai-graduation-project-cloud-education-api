import { CourseSection, Prisma, PrismaClient } from "@prisma/client";
// import organizations from "../database/seed/data/organizations";
import { UUID } from "crypto";
import AppError from "../utils/AppError.util";
import {
    CourseSectionCommentCreateSchema,
    CourseSectionCommentCreateType,
    CourseSectionCommentUpdateSchema,
    CourseSectionCommentUpdateType
} from "../validation";

const prisma = new PrismaClient();

export class CourseSectionCommentModel {
    async getAllCourseSectionComments(
        subdomain: string,
        courseCode: string,
        sectionOrder: number,
        skip: number,
        take: number
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

            const courseSectionId = (await prisma.courseSection.findUnique({
                where: {
                    courseOrder: {
                        courseId: courseId.id,
                        order: sectionOrder
                    }
                },
                select: {
                    id: true
                }
            })) as { id: UUID };

            if (!courseSectionId) {
                throw new AppError(
                    "No course section found with the given course code and section order",
                    404
                );
            }

            const courseSectionComments =
                await prisma.courseSectionComment.findMany({
                    skip: skip,
                    take: take,
                    orderBy: {
                        createdAt: "asc"
                    },
                    where: {
                        courseSectionId: courseSectionId.id
                    },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                                // avatar: true
                            }
                        }
                    }
                });
            return courseSectionComments;
        } catch (err) {
            throw err;
        }
    }

    async createComment(
        courseSectionComment: CourseSectionCommentCreateType,
        subdomain: string,
        courseCode: string,
        sectionOrder: number,
        userID: string
    ): Promise<CourseSectionCommentCreateType> {
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

            const courseSectionId = (await prisma.courseSection.findUnique({
                where: {
                    courseOrder: {
                        courseId: courseId.id,
                        order: sectionOrder
                    }
                },
                select: {
                    id: true
                }
            })) as { id: UUID };

            if (!courseSectionId) {
                throw new AppError(
                    "No course section found with the given course code and section order",
                    404
                );
            }

            const createdCourseSectionComment =
                await prisma.courseSectionComment.create({
                    data: {
                        ...courseSectionComment,
                        courseSectionId: courseSectionId.id,
                        userId: userID
                    },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                                // avatar: true
                            }
                        }
                    }
                });

            return createdCourseSectionComment;
        } catch (err) {
            throw err;
        }
    }

    async getOwner(
        subdomain: string,
        courseCode: string,
        sectionOrder: number,
        userID: string
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

            const courseSectionId = (await prisma.courseSection.findUnique({
                where: {
                    courseOrder: {
                        courseId: courseId.id,
                        order: sectionOrder
                    }
                },
                select: {
                    id: true
                }
            })) as { id: UUID };

            if (!courseSectionId) {
                throw new AppError(
                    "No course section found with the given course code and section order",
                    404
                );
            }

            const courseSectionComment =
                await prisma.courseSectionComment.findFirst({
                    where: {
                        courseSectionId: courseSectionId.id,
                        userId: userID
                    }
                });

            return courseSectionComment?.userId;
        } catch (err) {
            throw err;
        }
    }

    async updateCourseSectionComment(
        courseSectionData: CourseSectionCommentUpdateType,
        subdomain: string,
        courseCode: string,
        sectionOrder: number,
        commentId: string
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

            const courseSectionId = (await prisma.courseSection.findUnique({
                where: {
                    courseOrder: {
                        courseId: courseId.id,
                        order: sectionOrder
                    }
                },
                select: {
                    id: true
                }
            })) as { id: UUID };

            if (!courseSectionId) {
                throw new AppError(
                    "No course section found with the given course code and section order",
                    404
                );
            }

            const updatedCourseSectionComment =
                await prisma.courseSectionComment.update({
                    where: {
                        id: commentId
                    },
                    data: {
                        ...courseSectionData,
                        courseSectionId: courseSectionId.id
                    },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                                // avatar: true
                            }
                        }
                    }
                });

            return updatedCourseSectionComment;
        } catch (err) {
            throw err;
        }
    }

    async deleteCourseSectionComment(
        subdomain: string,
        courseCode: string,
        sectionOrder: number,
        commentId: string
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

            const courseSectionId = (await prisma.courseSection.findUnique({
                where: {
                    courseOrder: {
                        courseId: courseId.id,
                        order: sectionOrder
                    }
                },
                select: {
                    id: true
                }
            })) as { id: UUID };

            if (!courseSectionId) {
                throw new AppError(
                    "No course section found with the given course code and section order",
                    404
                );
            }

            await prisma.courseSectionComment.delete({
                where: {
                    id: commentId
                }
            });

            return true;
        } catch (err) {
            throw err;
        }
    }
}
