-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cardId" INTEGER;

-- CreateTable
CREATE TABLE "_UserToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToCard_AB_unique" ON "_UserToCard"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToCard_B_index" ON "_UserToCard"("B");

-- AddForeignKey
ALTER TABLE "_UserToCard" ADD CONSTRAINT "_UserToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToCard" ADD CONSTRAINT "_UserToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
