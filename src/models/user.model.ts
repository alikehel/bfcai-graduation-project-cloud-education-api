import { Prisma, PrismaClient } from "@prisma/client";
// import organizations from "../database/seed/data/organizations";
import AppError from "../utils/AppError.util";
import {
    UserLoginType,
    UserSignUpSchema,
    UserSignUpType,
    UserUpdateType
} from "../validation";

const prisma = new PrismaClient();

export class UserModel {
    async signup(
        user: UserSignUpType,
        subdomain: string
    ): Promise<{
        id: string;
        email: string;
        role: string;
        organizationSubdomain: string;
    } | null> {
        try {
            const createdUser = await prisma.user.create({
                data: {
                    ...user,
                    organization: { connect: { subdomain: subdomain } }
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    organizationSubdomain: true
                }
            });
            return createdUser;
        } catch (err) {
            throw err;
        }
    }

    async login(
        user: UserLoginType,
        subdomain: string
    ): Promise<{
        id: string;
        email: string;
        role: string;
        organizationSubdomain: string;
        password: string;
    } | null> {
        try {
            const returnedUser = await prisma.user.findUnique({
                where: {
                    emailSubdomain: {
                        email: user.email,
                        organizationSubdomain: subdomain
                    }
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    organizationSubdomain: true,
                    password: true
                }
            });
            return returnedUser;
        } catch (err) {
            throw err;
        }
    }

    async getUserID(email: string, subdomain: string): Promise<string | null> {
        try {
            const data = (await prisma.user.findUnique({
                where: {
                    emailSubdomain: {
                        email: email,
                        organizationSubdomain: subdomain
                    }
                },
                select: { id: true }
            })) as unknown as { id: string };
            return data.id;
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers(subdomain: string, skip: number, take: number) {
        try {
            const users = await prisma.user.findMany({
                skip: skip,
                take: take,
                orderBy: {
                    firstName: "desc"
                },
                where: {
                    organizationSubdomain: subdomain
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    courses: {
                        select: {
                            name: true,
                            code: true
                        }
                    }
                }
            });
            return users;
        } catch (err) {
            throw err;
        }
    }

    async getUsersCount(subdomain: string) {
        try {
            const count = await prisma.user.count({
                where: {
                    organizationSubdomain: subdomain
                }
            });
            return count;
        } catch (err) {
            throw err;
        }
    }

    async getUser(subdomain: string, userID: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userID
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    profilePicture: true,
                    courses: {
                        select: {
                            name: true,
                            code: true
                        }
                    }
                }
            });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async updateUser(
        subdomain: string,
        userID: string,
        userData: UserUpdateType
    ) {
        try {
            const user = await prisma.user.update({
                where: {
                    id: userID
                },
                data: {
                    courses: {
                        connect: userData.courses?.map((courseCode) => ({
                            codeSubdomain: {
                                code: courseCode,
                                organizationSubdomain: subdomain
                            }
                        }))
                    },
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phoneNumber: userData.phoneNumber,
                    role: userData.role
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    courses: {
                        select: {
                            name: true,
                            code: true
                        }
                    }
                }
            });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(subdomain: string, userID: string) {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: userID
                }
            });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async updateProfilePicture(subdomain: string, userID: string, url: string) {
        try {
            const user = await prisma.user.update({
                where: {
                    id: userID
                },
                data: {
                    profilePicture: url
                },
                select: {
                    profilePicture: true
                }
            });
            return user;
        } catch (err) {
            throw err;
        }
    }
}
