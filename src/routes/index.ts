import { Router } from "express";

import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";
import { gradeAnswer, summarize } from "../services/gpt.service";
import catchAsync from "../utils/catchAsync.util";
import authRoutes from "./auth.routes";
import coursesSectionsCommentsRoutes from "./courses-sections-comments.routes";
import coursesSectionsRoutes from "./courses-sections.routes";
import coursesRoutes from "./courses.routes";
import examsRoutes from "./exams.routes";
import filesRoutes from "./files.routes";
import leaderboardRoutes from "./leaderboard.routes";
import notificationsRoutes from "./notifications.routes";
import organizationRoutes from "./organization.routes";
import usersRoutes from "./users.routes";
const router = Router();

router.use("/", organizationRoutes);
router.use("/", authRoutes);
router.use("/", filesRoutes);
router.use("/", coursesRoutes);
router.use("/", coursesSectionsRoutes);
router.use("/", coursesSectionsCommentsRoutes);
router.use("/", usersRoutes);
router.use("/", examsRoutes);
router.use("/", notificationsRoutes);
router.use("/", leaderboardRoutes);

router.post(
    "/:organization/summarize",
    orgExist,
    isLoggedIn,
    isAutherized(["STUDENT", "TEACHER", "ADMIN"]),
    catchAsync(async (req, res) => {
        const { text } = req.body;

        if (!text) {
            throw new Error("Text is required");
        }
        if (typeof text !== "string") {
            throw new Error("Text must be a string");
        }

        const summary = await summarize(text);

        res.status(200).json({
            status: "success",
            data: summary
        });
    })
);

/*******************************************************************************
 * TEST ROUTES
 * TODO: Remove these routes
 *******************************************************************************/

router.route("/test").post(
    catchAsync(async (req, res) => {
        // #swagger.ignore = true
        const response = await gradeAnswer(
            "Explain Raspberry Pi",
            "Raspberry Pi is a computer which is capable of doing all the operations like a conventional computer. It has other features such as onboard WiFi, GPIO pins, and Bluetooth in order to communicate with external things.",
            "Raspberry Pi is a series of small single-board computers (SBCs) developed in the United Kingdom by the Raspberry Pi Foundation in association with Broadcom. The Raspberry Pi project originally leaned towards the promotion of teaching basic computer science in schools. The original model became more popular than anticipated, selling outside its target market for uses such as robotics."
        );
        res.status(200).json({
            status: "success",
            data: response
        });
    })
);

//*******************************************************************************//

export default router;
