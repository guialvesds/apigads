-- AlterTable
ALTER TABLE "users" ADD COLUMN     "taskId" INTEGER;

-- CreateTable
CREATE TABLE "_UserToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToTask_AB_unique" ON "_UserToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToTask_B_index" ON "_UserToTask"("B");

-- AddForeignKey
ALTER TABLE "_UserToTask" ADD CONSTRAINT "_UserToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTask" ADD CONSTRAINT "_UserToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
