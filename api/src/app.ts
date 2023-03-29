import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { SwaggerTheme } from "swagger-themes";
import swaggerUi from "swagger-ui-express";

import { NODE_ENV } from "./config/config";
import globalErrorcontroller from "./controllers/error.controller";
import router from "./routes";
import swaggerDocument from "./swagger/swagger.json";
import AppError from "./utils/AppError.util";

const app = express();

const swaggerTheme = new SwaggerTheme("v3");
const swaggerOptions = {
    explorer: true,
    customCss: swaggerTheme.getBuffer("dark")
};

if (NODE_ENV === "dev") {
    app.use(morgan("short"));
}

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
);
app.use(bodyParser.json()); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cors()); // Enable CORS - Cross Origin Resource Sharing
app.use(helmet()); // Set security HTTP headers

app.use("/", router);

app.all("*", (req, _res, next) => {
    console.log("err");
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorcontroller);

export default app;
