/*
  Warnings:

  - You are about to drop the column `Role` on the `users` table. All the data in the column will be lost.
  - Added the required column `passwordConfirm` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Role",
ADD COLUMN     "passwordConfirm" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'LEARNER';
