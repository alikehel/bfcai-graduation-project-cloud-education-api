/*
  Warnings:

  - A unique constraint covering the columns `[code,organizationSubdomain]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "courses_code_organizationSubdomain_key" ON "courses"("code", "organizationSubdomain");
