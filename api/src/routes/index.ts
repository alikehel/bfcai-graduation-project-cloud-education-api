import { Router } from "express";

import { login, signup } from "../controllers/auth.controller";
import { create } from "../controllers/organizations.controller";
import { test } from "../controllers/test.controller";
import { index } from "../controllers/users.controller";

// import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
// import { isAutherized } from "../middlewares/isAutherized.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = Router();

router.route("/organization/create/").post(create);

router.route("/:organization/auth/login/").post(orgExist, login);
router.route("/:organization/auth/signup/").post(orgExist, signup);

// TEST
// router.route("/:organization/users/").get(orgExist, index);
// router.route("/:organization/*/").get();
router.route("/test/").get(test);

export default router;
