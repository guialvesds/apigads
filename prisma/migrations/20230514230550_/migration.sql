/*
  Warnings:

  - You are about to drop the column `desktopId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_desktopId_fkey";

-- DropIndex
DROP INDEX "users_desktopId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "desktopId";
