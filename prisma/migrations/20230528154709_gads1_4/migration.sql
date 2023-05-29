-- AlterTable
ALTER TABLE "users" ADD COLUMN     "desktopId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_desktopId_fkey" FOREIGN KEY ("desktopId") REFERENCES "desktop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
