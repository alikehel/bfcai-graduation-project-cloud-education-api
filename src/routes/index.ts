import { Router } from "express";

import authRoutes from "./auth.routes";
import coursesSectionsCommentsRoutes from "./courses-sections-comments.routes";
import coursesSectionsRoutes from "./courses-sections.routes";
import coursesRoutes from "./courses.routes";
import filesRoutes from "./files.routes";
import organizationRoutes from "./organization.routes";

const router = Router();

router.use("/", organizationRoutes);
router.use("/", authRoutes);
router.use("/", filesRoutes);
router.use("/", coursesRoutes);
router.use("/", coursesSectionsRoutes);
router.use("/", coursesSectionsCommentsRoutes);
// router.route("/:organization/courses/:courseCode").post(orgExist);
// router.route("/:organization/courses").post(orgExist);
// router.route("/:organization/users").post(orgExist);
// router.route("/:organization/users").post(orgExist);

/*******************************************************************************
 * TEST ROUTES
 * TODO: Remove these routes
 *******************************************************************************/

router.route("/test").get((req, res) => {
    // #swagger.ignore = true
    res.status(200).json({
        status: "success",
        data: req.subdomains
    });
});

router.route("/hello").get((_req, res) => {
    // #swagger.ignore = true
    res.send(
        "<h1 style='display:inline-block; position:relative; top:40%; left:50%; transform:translate(-50%, -50%);'>Hello, World! 🌍</h1>"
    );
});

//*******************************************************************************//

export default router;
