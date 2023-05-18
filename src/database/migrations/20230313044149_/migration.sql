-- DropForeignKey
ALTER TABLE "course_section" DROP CONSTRAINT "course_section_courseId_fkey";

-- AlterTable
ALTER TABLE "course_section" ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "course_section" ADD CONSTRAINT "course_section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
