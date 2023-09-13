/*
  Warnings:

  - You are about to drop the `listTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "listTask" DROP CONSTRAINT "listTask_cardId_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_listId_fkey";

-- DropTable
DROP TABLE "listTask";

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE SET NULL ON UPDATE CASCADE;
