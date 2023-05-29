/*
  Warnings:

  - You are about to drop the column `usersId` on the `desktop` table. All the data in the column will be lost.
  - You are about to drop the `_UserToDesktop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToDesktop" DROP CONSTRAINT "_UserToDesktop_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToDesktop" DROP CONSTRAINT "_UserToDesktop_B_fkey";

-- AlterTable
ALTER TABLE "desktop" DROP COLUMN "usersId";

-- DropTable
DROP TABLE "_UserToDesktop";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_desktopId_fkey" FOREIGN KEY ("desktopId") REFERENCES "desktop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
