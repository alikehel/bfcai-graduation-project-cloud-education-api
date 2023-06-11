import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

import {
    AWS_ACCESS_KEY_ID,
    AWS_REGION,
    AWS_S3_BUCKET,
    AWS_SECRET_ACCESS_KEY
} from "../config/config";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";

import { UserModel } from "../models/user.model";

const userModel = new UserModel();

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: `${AWS_SECRET_ACCESS_KEY}` as string
    }
});

const bucketURL = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/`;

export const uploadImage = catchAsync(async (req, res, next) => {
    const { file } = req;
    const organization = req.params.organization;
    const courseCode = req.params.courseCode;

    if (!file) {
        return next(new AppError("Please upload a file", 400));
    }

    if (file.size > 1_000_000) {
        return next(new AppError("Please upload an image less than 1MB", 400));
    }

    if (!file.mimetype.startsWith("image")) {
        return next(new AppError("Please upload an image file", 400));
    }

    const fileName = file.originalname
        .split(".")[0]
        .replace(/[^A-Za-z0-9]/g, "-")
        .toLowerCase();
    const fileExtension = file.originalname.split(".")[1];
    const key = `${organization}/${courseCode}/images/${fileName}-${uuid()}.${fileExtension}`;
    const command = new PutObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    });

    await s3Client.send(command);

    res.status(201).json({
        success: 1,
        file: {
            url: `${bucketURL}${key}`
        }
    });
});

export const updateProfilePicture = catchAsync(async (req, res, next) => {
    const { file } = req;
    const organization = req.params.organization;
    const userId = res.locals.user.id;

    if (!file) {
        return next(new AppError("Please upload a file", 400));
    }

    if (file.size > 1_000_000) {
        return next(new AppError("Please upload an image less than 1MB", 400));
    }

    if (!file.mimetype.startsWith("image")) {
        return next(new AppError("Please upload an image file", 400));
    }

    const fileName = file.originalname
        .split(".")[0]
        .replace(/[^A-Za-z0-9]/g, "-")
        .toLowerCase();
    const fileExtension = file.originalname.split(".")[1];
    const key = `${organization}/profile-images/${fileName}-${uuid()}.${fileExtension}`;
    const command = new PutObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    });

    await s3Client.send(command);

    await userModel.updateProfilePicture(
        organization,
        userId,
        `${bucketURL}${key}`
    );

    res.status(201).json({
        success: 1,
        data: {
            url: `${bucketURL}${key}`
        }
    });
});

export const uploadVideo = catchAsync(async (req, res, next) => {
    const { file } = req;
    const organization = req.params.organization;
    const courseCode = req.params.courseCode;

    if (!file) {
        return next(new AppError("Please upload a file", 400));
    }

    if (file.size > 20_000_000) {
        return next(new AppError("Please upload a video less than 20MB", 400));
    }

    if (!file.mimetype.startsWith("video")) {
        return next(new AppError("Please upload a video file", 400));
    }

    const fileName = file.originalname
        .split(".")[0]
        .replace(/[^A-Za-z0-9]/g, "-")
        .toLowerCase();
    const fileExtension = file.originalname.split(".")[1];
    const key = `${organization}/${courseCode}/videos/${fileName}-${uuid()}.${fileExtension}`;
    const command = new PutObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    });

    await s3Client.send(command);

    // return res.status(201).json({ key });
    res.status(201).json({
        success: 1,
        file: {
            url: `${bucketURL}${key}`
        }
    });
});

// export const getUploadUrl = async (s3Client: S3Client, command: GetObjectCommand) => {
//     const url = await ;
//     return url;
// };

// export const getUploadedFileURL = catchAsync(async (req, res) => {
//     const command = new GetObjectCommand({
//         Bucket: AWS_S3_BUCKET,
//         Key: `${req.params.organization}/${req.params.courseCode}/`
//     });
//     const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
//     res.status(201).json({ status: "success", data: url });
// });

// export const getUploadedFilesURLs = catchAsync(async (req, res) => {
//     const imagesCommand = new ListObjectsV2Command({
//         Bucket: AWS_S3_BUCKET,
//         Prefix: `${req.params.organization}/${req.params.courseCode}/images`
//     });

//     const videosCommand = new ListObjectsV2Command({
//         Bucket: AWS_S3_BUCKET,
//         Prefix: `${req.params.organization}/${req.params.courseCode}/videos/`
//     });

//     const { Contents: imagesKeysContents = [] } = await s3Client.send(
//         imagesCommand
//     );
//     const imagesKeys = imagesKeysContents.map((key) => key.Key).slice(1);

//     const { Contents: videosKeysContents = [] } = await s3Client.send(
//         videosCommand
//     );
//     const videosKeys = videosKeysContents.map((key) => key.Key).slice(1);

//     const imagesURLs = await Promise.all(
//         imagesKeys.map((key) => {
//             return getSignedUrl(
//                 s3Client,
//                 new GetObjectCommand({ Bucket: AWS_S3_BUCKET, Key: key }),
//                 { expiresIn: 3600 }
//             );
//         })
//     );

//     const videosURLs = await Promise.all(
//         videosKeys.map((key) =>
//             getSignedUrl(
//                 s3Client,
//                 new GetObjectCommand({ Bucket: AWS_S3_BUCKET, Key: key }),
//                 {
//                     expiresIn: 3600
//                 }
//             )
//         )
//     );

//     res.status(201).json({
//         status: "success",
//         data: { imagesURLs, videosURLs }
//     });
// });

// export const getUploadURL = catchAsync(async (_req, res) => {
//     const command = new PutObjectCommand({
//         Bucket: AWS_S3_BUCKET,
//         Key: "uploads/" + Date.now() + "_TEST",
//         // ContentType: req.query.filetype,
//         // ContentLength: req.query.filesize,
//         // ACL: "public-read",
//         Expires: new Date(Date.now() + 3600 * 1000) // 1 hour
//     });
//     const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
//     res.status(201).json({ status: "success", data: url });
// });
