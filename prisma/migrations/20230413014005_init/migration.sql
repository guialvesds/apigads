-- AlterTable
ALTER TABLE "desktop" ADD COLUMN     "desktop_id" INTEGER;

-- AddForeignKey
ALTER TABLE "desktop" ADD CONSTRAINT "desktop_desktop_id_fkey" FOREIGN KEY ("desktop_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
