/*
  Warnings:

  - A unique constraint covering the columns `[courseId,order]` on the table `courses_sections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "courses_sections" ALTER COLUMN "content" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "courses_sections_courseId_order_key" ON "courses_sections"("courseId", "order");
