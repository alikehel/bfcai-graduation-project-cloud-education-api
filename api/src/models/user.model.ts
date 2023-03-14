// import bcrypt from "bcrypt";
// // import { SECRET } from "../config/config";
// import { SECRET } from "../config/config";
// import client from "../database/database";
// import { userQueries } from "../database/queries";
// import { User } from "../types/User";
// import AppError from "../utils/AppError.util";
// // import catchAsync from "../utils/catchAsync.util";
// export class UserStore {
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
