-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_cardId_fkey";

-- CreateTable
CREATE TABLE "_FileToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FileToCard_AB_unique" ON "_FileToCard"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToCard_B_index" ON "_FileToCard"("B");

-- AddForeignKey
ALTER TABLE "_FileToCard" ADD CONSTRAINT "_FileToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToCard" ADD CONSTRAINT "_FileToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
