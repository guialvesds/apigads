-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "cardId" INTEGER;

-- AlterTable
ALTER TABLE "file" ADD COLUMN     "cardId" INTEGER;

-- AlterTable
ALTER TABLE "listTask" ADD COLUMN     "cardId" INTEGER;

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "listId" INTEGER;

-- CreateTable
CREATE TABLE "goupeCard" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goupeCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_goupeToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_goupeToCard_AB_unique" ON "_goupeToCard"("A", "B");

-- CreateIndex
CREATE INDEX "_goupeToCard_B_index" ON "_goupeToCard"("B");

-- AddForeignKey
ALTER TABLE "listTask" ADD CONSTRAINT "listTask_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "listTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_goupeToCard" ADD CONSTRAINT "_goupeToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_goupeToCard" ADD CONSTRAINT "_goupeToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "goupeCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
