import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/config";
import { UserStore } from "../models/user.model";
import { User } from "../types/User";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";

const userStore = new UserStore();

export const signup = catchAsync(async (req, res) => {
    const user: User = req.body;
    const result = await userStore.signup({
        username: user.username,
        password: user.password,
        passwordConfirm: user.passwordConfirm,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
    });

    const token = jwt.sign(
        user.username,
        JWT_SECRET as string
        // , {
        // expiresIn: "90d"
        // }
    );
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true
        // expires: JWT_EXPIRES_IN
    });
    // res.setHeader("Authorization", `Bearer ${token}`);
    // res.status(201).json({ status: "success", data: { result }, token: token });
    res.status(201).json({ status: "success", token: token });
});

export const login = catchAsync(async (req, res, next) => {
    const { username, password, email } = req.body;
    if ((!email && !password) || (!username && !password)) {
        return next(new AppError("Complete your Information!", 400));
    }

    const result = await userStore.login({ username, password, email });
    if (!result) {
        return next(new AppError("Wrong Information", 400));
    }

    const token = jwt.sign(username, JWT_SECRET as string);
    res.cookie("jwt", token, { httpOnly: true, secure: true });
    // const result = await userStore.login();
    res.status(201).json({ status: "success", token: token });
    // res.status(200).json({
    //     status: "success",
    //     data: { username, password, email }
    // });
});
