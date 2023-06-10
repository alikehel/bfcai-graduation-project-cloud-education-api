import express from "express";

import { getNotifications } from "../controllers/notifications.controller";

import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = express.Router();

router.get(
    "/:organization/notifications",
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    getNotifications
);

export default router;
