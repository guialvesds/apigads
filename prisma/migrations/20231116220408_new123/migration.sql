/*
  Warnings:

  - Made the column `cardId` on table `file` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_cardId_fkey";

-- AlterTable
ALTER TABLE "file" ALTER COLUMN "cardId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
