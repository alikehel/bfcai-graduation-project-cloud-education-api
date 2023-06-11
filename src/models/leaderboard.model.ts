import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class LeaderboardModel {
    async getLeaderboard(subdomain: string) {
        const leaderboard = await prisma.leaderboard.findMany({
            select: {
                points: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            },
            orderBy: {
                points: "desc"
            },
            where: {
                organizationSubdomain: subdomain
            }
        });
        return leaderboard;
    }

    async updateLeaderboard(subdomain: string, userId: string, points: number) {
        await prisma.leaderboard.upsert({
            where: {
                userId: userId
                // organizationSubdomain: subdomain
            },
            update: {
                points: { increment: points }
            },
            create: {
                userId: userId,
                points: points,
                organizationSubdomain: subdomain
            }
        });
    }
}
