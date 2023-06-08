import { Router } from "express";

import {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
} from "../controllers/users.controller";

import { courseExist } from "../middlewares/courseExist.middleware";
import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";
import { upload } from "../middlewares/upload.middleware";
import { updateProfilePicture } from "../services/upload.service";

const router = Router();

router.route("/:organization/users").get(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    getAllUsers
    /*
        #swagger.tags = ['Users Routes']

        #swagger.description = 'Must be a teacher or admin'

        #swagger.security = [{
            "bearerAuth": []
        }]
    */
);

router.route("/:organization/users/:userId").get(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    getUser
    /*
        #swagger.tags = ['Users Routes']

        #swagger.description = 'Must be a teacher or admin, or student'

        #swagger.security = [{
            "bearerAuth": []
        }]
    */
);

router.route("/:organization/users/:userId").patch(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    updateUser
    /*
        #swagger.tags = ['Users Routes']

        #swagger.description = 'Must be a teacher or admin or student'

        #swagger.security = [{
            "bearerAuth": []
        }]
    */
);

router.route("/:organization/users/:userId").delete(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN"]),
    deleteUser
    /*
        #swagger.tags = ['Users Routes']

        #swagger.description = 'Must be an admin'

        #swagger.security = [{
            "bearerAuth": []
        }]
    */
);

router.route("/:organization/users/:userId/profile-image").put(
    orgExist,
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER", "STUDENT"]),
    upload.single("image"),
    updateProfilePicture
    /*
        #swagger.tags = ['Users Routes']

        #swagger.description = 'Must be a teacher or admin or student'

        #swagger.security = [{
            "bearerAuth": []
        }]
    */
);

export default router;
