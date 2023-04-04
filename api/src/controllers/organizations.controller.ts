import { OrganizationModel } from "../models/organization.model";
import AppError from "../utils/AppError.util";
// import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { SECRET } from "../config/config";
import catchAsync from "../utils/catchAsync.util";
import { OrganizationSignUpSchema, UserSignUpSchema } from "../validation";

const organizationModel = new OrganizationModel();
// const userModel = new UserModel();

export const create = catchAsync(async (req, res, next) => {
    const organization = OrganizationSignUpSchema.parse(req.body.organization);
    const organizationAdmin = {
        ...UserSignUpSchema.parse(req.body.organizationAdmin),
        role: "ADMIN"
    };
    const passwordConfirm = req.body.organizationAdmin.passwordConfirm;

    if (organizationAdmin.password != passwordConfirm) {
        return next(new AppError("Passwords dont match", 400));
    }

    const emailDomain = req.body.organization.emailDomain;
    if (organizationAdmin.email.split("@")[1] !== emailDomain) {
        return next(
            new AppError(
                "You need to register using the organization email",
                400
            )
        );
    }

    const hashedPassword = bcrypt.hashSync(
        organizationAdmin.password + (SECRET as string),
        12
    );

    const admin = {
        ...organizationAdmin,
        password: hashedPassword
    };

    const createdOrganization = await organizationModel.create(
        organization,
        admin
    );

    res.status(201).json({ status: "success", data: createdOrganization });
    // res.redirect(`/${organization.subdomain}/auth/login`);
});
