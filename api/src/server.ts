import * as dotenv from "dotenv";
import path from "path";
import app from "./app";
import { PORT as processPORT } from "./config/config";

const PORT = processPORT || 3000;
const address = `http://localhost:${PORT}`;

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, "\n", err.message);
    process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

const server = app.listen(PORT, () => {
    // console.log("🚀 ~ file: index.ts ~ line 27 ~ app.listen ~ PORT", PORT);
    // if (NODE_ENV === "dev") {
    // eslint-disable-next-line no-console
    console.log(`Starting APP On -> ${address}`);
    // }
});
