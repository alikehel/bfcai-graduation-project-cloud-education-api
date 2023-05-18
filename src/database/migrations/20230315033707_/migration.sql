/*
  Warnings:

  - You are about to drop the column `courseId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `passwordConfirm` on the `users` table. All the data in the column will be lost.
  - The `Role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_OrganizationToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isActive` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToUser" DROP CONSTRAINT "_OrganizationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToUser" DROP CONSTRAINT "_OrganizationToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_courseId_fkey";

-- DropIndex
DROP INDEX "users_firstName_lastName_key";

-- DropIndex
DROP INDEX "users_phoneNumber_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "courseId",
DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "prerequisiteId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordConfirm",
ADD COLUMN     "organizationId" TEXT NOT NULL,
DROP COLUMN "Role",
ADD COLUMN     "Role" TEXT NOT NULL DEFAULT 'LEARNER';

-- DropTable
DROP TABLE "_OrganizationToUser";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
