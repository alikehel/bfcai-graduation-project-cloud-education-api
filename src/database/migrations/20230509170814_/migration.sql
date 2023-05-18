/*
  Warnings:

  - You are about to drop the column `prerequisiteId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_prerequisiteId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "prerequisiteId",
ADD COLUMN     "prerequisites" TEXT[];
