import { Router } from "express";

import { uploadImage, uploadVideo } from "../services/upload.service";

import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

// router
//     .route("/:organization/courses/:courseCode/getUploadedFileURL")
//     .get(getUploadedFileURL);

router
    .route("/:organization/courses/:courseCode/uploadImage")
    .post(
        isLoggedIn,
        isAutherized(["ADMIN", "TEACHER"]),
        upload.single("image"),
        uploadImage
    );

router
    .route("/:organization/courses/:courseCode/uploadVideo")
    .post(
        isLoggedIn,
        isAutherized(["ADMIN", "TEACHER"]),
        upload.single("video"),
        uploadVideo
    );

export default router;
