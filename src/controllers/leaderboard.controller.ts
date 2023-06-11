import { Request, Response } from "express";
import { LeaderboardModel } from "../models/leaderboard.model";
// import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";

const leaderboardModel = new LeaderboardModel();

export const getLeaderboard = catchAsync(
    async (req: Request, res: Response) => {
        const subdomain = req.params.organization;
        const leaderboard = await leaderboardModel.getLeaderboard(subdomain);
        res.status(200).json({
            status: "success",
            data: leaderboard
        });
    }
);
