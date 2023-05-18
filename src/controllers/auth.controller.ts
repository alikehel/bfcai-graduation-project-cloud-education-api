import { json } from "body-parser";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET, SECRET } from "../config/config";
import { OrganizationModel } from "../models/organization.model";
import { UserModel } from "../models/user.model";
// import { User } from "../types/User";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
import { UserLoginSchema, UserSignUpSchema } from "../validation";

const userModel = new UserModel();
const organizationModel = new OrganizationModel();

export const signup = catchAsync(async (req, res, next) => {
    const user = UserSignUpSchema.parse(req.body);
    const passwordConfirm = req.body.passwordConfirm;
    const subdomain = req.params.organization;

    if (user.password != passwordConfirm) {
        return next(new AppError("Passwords dont match", 400));
    }

    // TODO: NEED TO IMPLEMENT EMAIL VERIFICATION

    const emailDomain = (await organizationModel.getEmailDomain(subdomain))
        ?.emailDomain;

    if (user.email.split("@")[1] !== emailDomain) {
        return next(
            new AppError(
                "You need to register using the organization email",
                400
            )
        );
    }

    const hashedPassword = bcrypt.hashSync(
        user.password + (SECRET as string),
        12
    );

    const createdUser = await userModel.signup(
        { ...user, password: hashedPassword },
        subdomain
    );

    const token = jwt.sign(
        { email: user.email, subdomain: subdomain, role: "LEARNER" },
        JWT_SECRET as string,
        { expiresIn: JWT_EXPIRES_IN }
    );
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true
        // expires: JWT_EXPIRES_IN
    });
    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(201).json({
        status: "success",
        // data: { createdUser },
        token: token
    });
});

export const login = catchAsync(async (req, res, next) => {
    const user = UserLoginSchema.parse(req.body);
    const subdomain = req.params.organization;

    const returnedUser = await userModel.login(user, subdomain);

    if (!returnedUser) {
        throw new AppError("User not found", 400);
    }

    const isValidPassword = bcrypt.compareSync(
        user.password + (SECRET as string),
        returnedUser.password
    );

    if (!isValidPassword) {
        throw new AppError("Password is not correct", 400);
    }

    const token = jwt.sign(
        { email: user.email, subdomain: subdomain, role: returnedUser.role },
        JWT_SECRET as string,
        { expiresIn: JWT_EXPIRES_IN }
    );
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true
        // expires: JWT_EXPIRES_IN
    });
    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(201).json({
        status: "success",
        // data: { returnedUser },
        token: token
    });
});
