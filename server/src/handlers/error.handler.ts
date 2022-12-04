import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.util";

// const handleCastErrorDB = (err) => {
//     const message = `Invalid ${err.path}: ${err.value}.`;
//     return new AppError(message, 400);
// };

// const handleDuplicateFieldsDB = (err) => {
//     const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//     console.log(value);

//     const message = `Duplicate field value: ${value}. Please use another value!`;
//     return new AppError(message, 400);
// };

// const handleValidationErrorDB = (err) => {
//     const errors = Object.values(err.errors).map((el) => el.message);

//     const message = `Invalid input data. ${errors.join(". ")}`;
//     return new AppError(message, 400);
// };

const sendErrorDev = (err: AppError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err: AppError, res: Response) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

        // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error("ERROR 💥", err);

        // 2) Send generic message
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!"
        });
    }
};

export default (
    err: AppError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
) => {
    // console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "dev") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "prod") {
        const error = { ...err };

        // if (error.name === "CastError") error = handleCastErrorDB(error);
        // if (error.name === "ValidationError") {
        //     error = handleValidationErrorDB(error);
        // }

        sendErrorProd(error, res);
    }
};
