import { OrganizationModel } from "../models/organization.model";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";

const organizationModel = new OrganizationModel();

export const orgExist = catchAsync(async (req, res, next) => {
    if (!(await organizationModel.orgExist(req.params.organization))) {
        return next(new AppError("ORGANIZATION NOT FOUND", 404));
    }

    return next();
});
