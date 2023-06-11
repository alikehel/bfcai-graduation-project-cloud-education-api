import { Prisma, PrismaClient } from "@prisma/client";
// import AppError from "../utils/AppError.util";
import { UserSignUpType } from "../validation";

const prisma = new PrismaClient();

export class OrganizationModel {
    async create(
        organization: Prisma.OrganizationCreateInput,
        admin: UserSignUpType
    ): Promise<Prisma.OrganizationCreateInput> {
        const createdOrganization = await prisma.organization.create({
            data: { ...organization, User: { create: admin } }
        });
        return createdOrganization;
    }

    async orgExist(subdomain: string) {
        const org = await prisma.organization.findUnique({
            where: { subdomain: subdomain }
        });
        if (org) {
            return true;
        } else {
            return false;
        }
    }

    async getEmailDomain(subdomain: string) {
        const org = await prisma.organization.findUnique({
            where: { subdomain: subdomain },
            select: { emailDomain: true }
        });
        return org;
    }
}
