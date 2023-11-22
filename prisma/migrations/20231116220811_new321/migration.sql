-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_cardId_fkey";

-- AlterTable
ALTER TABLE "file" ALTER COLUMN "cardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
