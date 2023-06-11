import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class NotificationModel {
    async sendNotification(
        title: string,
        message: string,
        userID: string,
        extra: string
    ) {
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
    }

    async getNotifications(userID: string) {
        const notifications = await prisma.notification.findMany({
            where: {
                userId: userID
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return notifications;
    }
}
