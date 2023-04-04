import { NextFunction, Request, Response } from "express";

import AppError from "../utils/AppError.util";

export const isAutherized = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if the user is logged in and has the appropriate role
        const { role } = req.user as {
            email: string;
            subdomain: string;
            role: string;
        };
        if (req.user && allowedRoles.includes(role)) {
            next(); // If user is authorized, call the next middleware function
        } else {
            return next(new AppError("Unauthorized", 401));
        }
    };
};
