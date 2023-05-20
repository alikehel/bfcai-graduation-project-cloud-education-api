/*
  Warnings:

  - You are about to drop the `course_section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "course_section" DROP CONSTRAINT "course_section_courseId_fkey";

-- DropTable
DROP TABLE "course_section";

-- CreateTable
CREATE TABLE "courses_sections" (
    "id" TEXT NOT NULL,
    "content" JSONB,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "courses_sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses_sections" ADD CONSTRAINT "courses_sections_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
