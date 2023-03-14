import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { index } from "../controllers/users.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";

const usersRouter = Router();

usersRouter.route("/").get(index);
usersRouter.route("/signup").post(signup);
usersRouter.route("/login").post(login);

//TEST
usersRouter.route("/dashboard").get(isLoggedIn, index);

export default usersRouter;
