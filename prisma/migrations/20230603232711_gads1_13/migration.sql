/*
  Warnings:

  - You are about to drop the `goupeCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_goupeToCard" DROP CONSTRAINT "_goupeToCard_B_fkey";

-- DropTable
DROP TABLE "goupeCard";

-- CreateTable
CREATE TABLE "groupCard" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_groupToDesktop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_groupToDesktop_AB_unique" ON "_groupToDesktop"("A", "B");

-- CreateIndex
CREATE INDEX "_groupToDesktop_B_index" ON "_groupToDesktop"("B");

-- AddForeignKey
ALTER TABLE "_groupToDesktop" ADD CONSTRAINT "_groupToDesktop_A_fkey" FOREIGN KEY ("A") REFERENCES "desktop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupToDesktop" ADD CONSTRAINT "_groupToDesktop_B_fkey" FOREIGN KEY ("B") REFERENCES "groupCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_goupeToCard" ADD CONSTRAINT "_goupeToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "groupCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
