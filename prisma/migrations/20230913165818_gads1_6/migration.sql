/*
  Warnings:

  - You are about to drop the column `cardId` on the `list` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "list" DROP CONSTRAINT "list_cardId_fkey";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "cardId";

-- CreateTable
CREATE TABLE "_ListToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ListToCard_AB_unique" ON "_ListToCard"("A", "B");

-- CreateIndex
CREATE INDEX "_ListToCard_B_index" ON "_ListToCard"("B");

-- AddForeignKey
ALTER TABLE "_ListToCard" ADD CONSTRAINT "_ListToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToCard" ADD CONSTRAINT "_ListToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
