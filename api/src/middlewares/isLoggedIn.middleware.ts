// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config/config";
// import AppError from "../utils/AppError.util";

// export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
//     let token;
//     // IS USER LOGGED IN
//     if (
//         req.headers.authorization &&
//         req.headers.authorization?.startsWith("Bearer")
//     ) {
//         token = req.headers.authorization.split(" ")[1];
//     } else {
//         return next(new AppError("Please Log In!", 401));
//     }

//     // IS TOKEN VALID
//     const decodedData = jwt.verify(token, JWT_SECRET as string);

//     //GRANT ACCESS
//     return next();
// };
