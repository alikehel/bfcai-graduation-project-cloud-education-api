/*
  Warnings:

  - You are about to drop the column `course` on the `course_section` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `course_section` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `course_section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course_section" DROP CONSTRAINT "course_section_course_fkey";

-- DropIndex
DROP INDEX "course_section_course_key";

-- AlterTable
ALTER TABLE "course_section" DROP COLUMN "course",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_section_courseId_key" ON "course_section"("courseId");

-- AddForeignKey
ALTER TABLE "course_section" ADD CONSTRAINT "course_section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
