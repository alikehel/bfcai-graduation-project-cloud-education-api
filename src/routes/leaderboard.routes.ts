import express from "express";

import { getLeaderboard } from "../controllers/leaderboard.controller";

import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = express.Router();

router.get(
    "/:organization/leaderboard",
    orgExist,
    isLoggedIn,
    isAutherized(["STUDENT", "TEACHER", "ADMIN"]),
    getLeaderboard
);

export default router;
