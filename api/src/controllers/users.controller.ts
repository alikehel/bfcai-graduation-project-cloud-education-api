import { UserStore } from "../models/user.model";
import catchAsync from "../utils/catchAsync.util";

const userStore = new UserStore();

export const index = catchAsync(async (_req, res) => {
    const result = await userStore.index();
    res.status(200).json({ status: "success", data: { result } });
});
