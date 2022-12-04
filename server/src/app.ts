import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
// import dashboardRoutes from "./handlers/services/dashboard";
import globalErrorHandler from "./handlers/error.handler";
// import usersRoutes from "./handlers/users";
import AppError from "./utils/AppError.util";

dotenv.config();

const app: express.Application = express();

if (process.env.NODE_ENV === "dev") {
    app.use(morgan("short"));
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "Hello World 🌍"
    });
});

// 3) ROUTES
// app.use("/api/v1/users", usersRoutes);

app.all("*", (req, _res, next) => {
    console.log("err");
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//     res.json({ err: err });
// });

export default app;
