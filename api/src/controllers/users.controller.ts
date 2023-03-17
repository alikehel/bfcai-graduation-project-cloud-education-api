import { UserModel } from "../models/user.model";
import catchAsync from "../utils/catchAsync.util";

const userModel = new UserModel();

export const index = catchAsync(async (_req, res) => {
    // const result = await userModel.index();
    // res.status(200).json({ status: "success", data: { result } });
});
