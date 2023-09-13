/*
  Warnings:

  - You are about to drop the `_ListToCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ListToCard" DROP CONSTRAINT "_ListToCard_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToCard" DROP CONSTRAINT "_ListToCard_B_fkey";

-- AlterTable
ALTER TABLE "list" ADD COLUMN     "cardId" INTEGER;

-- DropTable
DROP TABLE "_ListToCard";

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
