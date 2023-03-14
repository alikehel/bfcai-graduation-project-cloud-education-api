/*
  Warnings:

  - You are about to drop the column `editorJSJSON` on the `course_section` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `course_section` table. All the data in the column will be lost.
  - You are about to drop the column `previousId` on the `course_section` table. All the data in the column will be lost.
  - Added the required column `content` to the `course_section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course_section" DROP CONSTRAINT "course_section_parentId_fkey";

-- DropForeignKey
ALTER TABLE "course_section" DROP CONSTRAINT "course_section_previousId_fkey";

-- DropIndex
DROP INDEX "course_section_parentId_key";

-- DropIndex
DROP INDEX "course_section_previousId_key";

-- AlterTable
ALTER TABLE "course_section" DROP COLUMN "editorJSJSON",
DROP COLUMN "parentId",
DROP COLUMN "previousId",
ADD COLUMN     "content" JSONB NOT NULL;
