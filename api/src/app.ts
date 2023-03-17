import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { NODE_ENV } from "./config/config";
import globalErrorcontroller from "./controllers/error.controller";
import router from "./routes";
import AppError from "./utils/AppError.util";

const app: express.Application = express();

if (NODE_ENV === "dev") {
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

app.use("/", router);

app.all("*", (req, _res, next) => {
    console.log("err");
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorcontroller);

export default app;
