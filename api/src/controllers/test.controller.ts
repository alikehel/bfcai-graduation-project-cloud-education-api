import catchAsync from "../utils/catchAsync.util";

export const test = catchAsync(async (req, res) => {
    res.status(200).json({
        status: "success",
        data: req.subdomains
    });
});
