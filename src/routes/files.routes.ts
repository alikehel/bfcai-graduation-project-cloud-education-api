import { Router } from "express";

import { uploadImage, uploadVideo } from "../services/upload.service";

import { isAutherized } from "../middlewares/isAutherized.middleware";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

// router
//     .route("/:organization/courses/:courseCode/getUploadedFileURL")
//     .get(getUploadedFileURL);

router.route("/:organization/courses/:courseCode/uploadImage").post(
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    upload.single("image"),
    uploadImage
    /*
        #swagger.tags = ['Files Routes']

        #swagger.description = 'Must be a teacher or admin to upload an image'

        #swagger.auto = false

        #swagger.parameters['organization'] = {
            in: 'path',
            description: 'Organization Subdomain',
            required: true
        }

        #swagger.parameters['courseCode'] = {
            in: 'path',
            description: 'Course Code',
            required: true
        }

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.responses[201-1] = {
            description: 'Image Uploaded Successfully',
            schema: {
                success: 1,
                file: {
                    url: `url`
                }
            }
        }

        #swagger.responses[400-1] = {
            schema: {
                status: "fail",
                message: 'Please upload a file'
            },
            description: 'Please upload a file'
        }

        #swagger.responses[400-2] = {
            schema: {
                status: "fail",
                message: 'Please upload an image less than 1MB'
            },
            description: 'Please upload an image less than 1MB'
        }

        #swagger.responses[400-3] = {
            description: 'Please upload an image file',
            schema: {
                status: "error",
                message: 'Please upload an image file'
            }
        }

        #swagger.consumes = ['multipart/form-data']

        #swagger.parameters['image'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
        }
    */
);

router.route("/:organization/courses/:courseCode/uploadVideo").post(
    isLoggedIn,
    isAutherized(["ADMIN", "TEACHER"]),
    upload.single("video"),
    uploadVideo
    /*
        #swagger.tags = ['Files Routes']

        #swagger.description = 'Must be a teacher or admin to upload a video'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.responses[201-1] = {
            description: 'Image Uploaded Successfully',
            schema: {
                success: 1,
                file: {
                    url: `url`
                }
            }
        }

        #swagger.responses[400-1] = {
            schema: {
                status: "fail",
                message: 'Please upload a file'
            },
            description: 'Please upload a file'
        }

        #swagger.responses[400-2] = {
            schema: {
                status: "fail",
                message: 'Please upload a video less than 20MB'
            },
            description: 'Please upload a video less than 20MB'
        }

        #swagger.responses[400-3] = {
            description: 'Please upload a video file',
            schema: {
                status: "error",
                message: 'Please upload a video file'
            }
        }

        #swagger.consumes = ['multipart/form-data']

        #swagger.parameters['video'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
        }
    */
);

export default router;
