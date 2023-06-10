import { NextFunction, Request, Response } from "express";
import { NotificationModel } from "../models/notification.model";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";

const notificationModel = new NotificationModel();

export const getNotifications = catchAsync(
    async (req: Request, res: Response) => {
        const subdomain = req.params.organization;
        const userID = res.locals.user.id;

        const notifications = await notificationModel.getNotifications(userID);

        res.status(200).json({
            status: "success",
            data: notifications
        });
    }
);
