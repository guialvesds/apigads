-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_desktopId_fkey";

-- AlterTable
ALTER TABLE "desktop" ADD COLUMN     "usersId" INTEGER;

-- CreateTable
CREATE TABLE "_UserToDesktop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToDesktop_AB_unique" ON "_UserToDesktop"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToDesktop_B_index" ON "_UserToDesktop"("B");

-- AddForeignKey
ALTER TABLE "_UserToDesktop" ADD CONSTRAINT "_UserToDesktop_A_fkey" FOREIGN KEY ("A") REFERENCES "desktop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToDesktop" ADD CONSTRAINT "_UserToDesktop_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
