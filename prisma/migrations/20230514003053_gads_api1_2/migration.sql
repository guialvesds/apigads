-- AlterTable
ALTER TABLE "card" ADD COLUMN     "desktopId" INTEGER;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_desktopId_fkey" FOREIGN KEY ("desktopId") REFERENCES "desktop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
