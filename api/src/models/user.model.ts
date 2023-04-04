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
            throw new AppError(`Cant signup the user: ${err}`, 500);
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
            throw new AppError(`Cant login the user: ${err}`, 500);
        }
    }

    // async index(): Promise<Prisma.UserCreateInput[]> {
    //     try {
    //         const users = await prisma.user.findMany();
    //         return users;
    //     } catch (err) {
    //         throw new AppError("Cant Get All Users", 500);
    //     }
    // }
    // async login({ email, password }): Promise<Prisma.UserCreateInput> {
    //     try {
    //         const user = await prisma.user.findUnique({
    //             where: {}
    //         });
    //         return users;
    //     } catch (err) {
    //         throw new AppError("Cant Get All Users", 500);
    //     }
    // }
}

// import bcrypt from "bcrypt";
// // import { SECRET } from "../config/config";
// import { SECRET } from "../config/config";
// import client from "../database/database";
// import { userQueries } from "../database/queries";
// import { User } from "../types/User";
// import AppError from "../utils/AppError.util";
// // import catchAsync from "../utils/catchAsync.util";
// export class UserModel {
//     async index(): Promise<User[]> {
//         try {
//             const conn = await client.connect();
//             const queryResult = await conn.query(userQueries.showUsers);
//             conn.release();
//             return queryResult.rows;
//         } catch (err) {
//             throw new AppError("Cant Get All Users", 500);
//         }
//     }

//     async signup(user: User): Promise<User> {
//         try {
//             if (user.password !== user.passwordConfirm) {
//                 throw new AppError("Passwords does not match", 400);
//             }
//             const hash = bcrypt.hashSync(
//                 user.password + (SECRET as string),
//                 12
//             );
//             const conn = await client.connect();
//             const queryResult = await conn.query(userQueries.createUser, [
//                 user.email,
//                 user.username,
//                 hash,
//                 user.firstname,
//                 user.lastname,
//                 user.role
//             ]);
//             conn.release();
//             return queryResult.rows[0];
//         } catch (err) {
//             throw err;
//         }
//     }

//     async login(user: {
//         username: string;
//         password: string;
//         email: string;
//     }): Promise<boolean> {
//         try {
//             const conn = await client.connect();
//             const result = await conn.query(userQueries.authenticateUser, [
//                 user.username
//             ]);
//             const password = result.rows[0].password;
//             const isAuthenticated = bcrypt.compareSync(
//                 user.password + (SECRET as string),
//                 password
//             );
//             conn.release();
//             return isAuthenticated;
//         } catch (err) {
//             throw err;
//         }
//     }

//     // async login(): Promise<User> {
//     //     try {
//     //         const conn = await client.connect();
//     //         const queryResult = await conn.query(userQueries.showUsers);
//     //         conn.release();
//     //         return queryResult.rows[0];
//     //     } catch (err) {
//     //         throw new AppError("Cant Login", 500);
//     //     }
//     // }
// }
