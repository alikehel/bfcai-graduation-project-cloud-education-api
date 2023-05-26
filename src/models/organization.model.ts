import { Prisma, PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.util";
import { UserSignUpType } from "../validation";

const prisma = new PrismaClient();

export class OrganizationModel {
    async create(
        organization: Prisma.OrganizationCreateInput,
        admin: UserSignUpType
    ): Promise<Prisma.OrganizationCreateInput> {
        try {
            const createdOrganization = await prisma.organization.create({
                data: { ...organization, User: { create: admin } }
            });
            return createdOrganization;
        } catch (err) {
            throw err;
        }
    }

    async orgExist(subdomain: string) {
        try {
            const org = await prisma.organization.findUnique({
                where: { subdomain: subdomain }
            });
            if (org) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    }

    async getEmailDomain(subdomain: string) {
        try {
            const org = await prisma.organization.findUnique({
                where: { subdomain: subdomain },
                select: { emailDomain: true }
            });
            return org;
        } catch (err) {
            throw err;
        }
    }
}
