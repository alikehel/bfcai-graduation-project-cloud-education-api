import { Prisma, PrismaClient } from "@prisma/client";
import organizations from "../database/seed/data/organizations";
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
            throw new AppError(`Cant signup the user`, 500);
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
            throw new AppError(`Cant login the user`, 500);
        }
    }
}
