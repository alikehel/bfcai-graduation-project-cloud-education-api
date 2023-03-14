export default class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    code!: string;
    message: string;

    constructor(message: string, statusCode: number) {
        super();
        //TODO
        // super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.message = message;
        // this.code = 0;

        Error.captureStackTrace(this, this.constructor);
    }
}
