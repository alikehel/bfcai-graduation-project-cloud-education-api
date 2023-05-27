import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import AppError from "../utils/AppError.util";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        // IS USER LOGGED IN
        if (
            req.headers.authorization &&
            req.headers.authorization?.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        } else {
            return next(new AppError("Please Log In!", 401));
        }

        // IS TOKEN VALID
        const { email, subdomain, role } = jwt.verify(
            token,
            JWT_SECRET as string
        ) as { email: string; subdomain: string; role: string };

        // Is user still registered on the current subdomain?
        if (subdomain !== req.params.organization) {
            return next(new AppError("You are not authorized to do this", 401));
        }

        // TODO: Check if user still exists

        // TODO: Check if user changed password after the token was issued

        req.user = { email, subdomain, role };
        res.locals.user = { email, subdomain, role };

        //GRANT ACCESS
        return next();
    } catch (err) {
        res.status(401).json({
            status: "invalid"
        });
    }
};
