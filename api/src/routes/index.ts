import { Router } from "express";

import { login, signup } from "../controllers/auth.controller";
import { create } from "../controllers/organizations.controller";
import { index } from "../controllers/users.controller";

import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

import filesRoutes from "./files.routes";

const router = Router();

/*******************************************************************************
 * ORGANIZATION ROUTES
 *******************************************************************************/

router.route("/organization/create").post(create);

/*******************************************************************************
 * AUTH ROUTES
 *******************************************************************************/

router.route("/:organization/auth/login").post(orgExist, login);
router.route("/:organization/auth/signup").post(orgExist, signup);

/*******************************************************************************
 * Courses ROUTES
 *******************************************************************************/

// router.route("/:organization/courses/:courseCode").post(orgExist);
// router.route("/:organization/courses").post(orgExist);

/*******************************************************************************
 * Users ROUTES
 *******************************************************************************/

// router.route("/:organization/users").post(orgExist);
// router.route("/:organization/users").post(orgExist);

/*******************************************************************************
 * Files ROUTES (Uploads)
 *******************************************************************************/

router.use("/", filesRoutes);

/*******************************************************************************
 * TEST ROUTES
 * TODO: Remove these routes
 *******************************************************************************/

router.route("/test").get((req, res) => {
    res.status(200).json({
        status: "success",
        data: req.subdomains
    });
});

router.route("/hello").get((_req, res) => {
    res.send(
        "<h1 style='display:inline-block; position:relative; top:40%; left:50%; transform:translate(-50%, -50%);'>Hello, World! 🌍</h1>"
    );
});

//*******************************************************************************//

export default router;
