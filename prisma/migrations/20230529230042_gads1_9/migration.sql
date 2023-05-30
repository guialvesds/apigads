/*
  Warnings:

  - You are about to drop the column `desktopId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_desktopId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "desktopId";

-- CreateTable
CREATE TABLE "_UserToDesktop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToDesktop_AB_unique" ON "_UserToDesktop"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToDesktop_B_index" ON "_UserToDesktop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "_UserToDesktop" ADD CONSTRAINT "_UserToDesktop_A_fkey" FOREIGN KEY ("A") REFERENCES "desktop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToDesktop" ADD CONSTRAINT "_UserToDesktop_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
