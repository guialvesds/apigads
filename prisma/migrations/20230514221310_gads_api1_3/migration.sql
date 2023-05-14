/*
  Warnings:

  - A unique constraint covering the columns `[desktopId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "desktop" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "desktopId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_desktopId_key" ON "users"("desktopId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_desktopId_fkey" FOREIGN KEY ("desktopId") REFERENCES "desktop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
