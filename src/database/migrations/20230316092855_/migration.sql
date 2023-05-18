/*
  Warnings:

  - You are about to drop the column `organizationId` on the `courses` table. All the data in the column will be lost.
  - The primary key for the `organizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,organizationSubdomain]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationSubdomain` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationSubdomain` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organizationId_fkey";

-- DropIndex
DROP INDEX "organizations_subdomain_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "organizationId",
ADD COLUMN     "organizationSubdomain" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("subdomain");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "organizationId",
ADD COLUMN     "organizationSubdomain" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_organizationSubdomain_key" ON "users"("email", "organizationSubdomain");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationSubdomain_fkey" FOREIGN KEY ("organizationSubdomain") REFERENCES "organizations"("subdomain") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_organizationSubdomain_fkey" FOREIGN KEY ("organizationSubdomain") REFERENCES "organizations"("subdomain") ON DELETE RESTRICT ON UPDATE CASCADE;
