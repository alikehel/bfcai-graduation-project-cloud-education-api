import { Router } from "express";

import authRoutes from "./auth.routes";
import coursesSectionsCommentsRoutes from "./courses-sections-comments.routes";
import coursesSectionsRoutes from "./courses-sections.routes";
import coursesRoutes from "./courses.routes";
import filesRoutes from "./files.routes";
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

//*******************************************************************************//

export default router;
