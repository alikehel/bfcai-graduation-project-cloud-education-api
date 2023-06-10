import { Prisma, PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.util";
import { ExamCreateSchema, ExamCreateType } from "../validation";

const prisma = new PrismaClient();

export class NotificationModel {
    async sendNotification(
        title: string,
        message: string,
        userID: string,
        extra: string
    ) {
        try {
            const createdNotification = await prisma.notification.create({
                data: {
                    title,
                    message,
                    extra: extra,
                    user: {
                        connect: {
                            id: userID
                        }
                    }
                }
            });
            return createdNotification;
        } catch (err) {
            throw err;
        }
    }

    async getNotifications(userID: string) {
        try {
            const notifications = await prisma.notification.findMany({
                where: {
                    userId: userID
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            return notifications;
        } catch (err) {
            throw err;
        }
    }
}
