import { Prisma, PrismaClient } from "@prisma/client";
// import organizations from "../database/seed/data/organizations";
import AppError from "../utils/AppError.util";
import { UserLoginType, UserSignUpSchema, UserSignUpType } from "../validation";

const prisma = new PrismaClient();

export class UserModel {
    async signup(
        user: UserSignUpType,
        subdomain: string
    ): Promise<UserSignUpType> {
        try {
            const createdUser = await prisma.user.create({
                data: {
                    ...user,
                    organization: { connect: { subdomain: subdomain } }
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
    ): Promise<{ email: string; password: string; role: string } | null> {
        try {
            const returnedUser = await prisma.user.findUnique({
                where: {
                    emailSubdomain: {
                        email: user.email,
                        organizationSubdomain: subdomain
                    }
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
}
