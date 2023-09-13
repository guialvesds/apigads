/*
  Warnings:

  - You are about to drop the `listTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "listTask" DROP CONSTRAINT "listTask_cardId_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_listId_fkey";

-- DropTable
DROP TABLE "listTask";

-- DropTable
DROP TABLE "task";
