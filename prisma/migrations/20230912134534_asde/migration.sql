/*
  Warnings:

  - You are about to drop the column `name` on the `listTask` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `task` table. All the data in the column will be lost.
  - Added the required column `title` to the `listTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listTask" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(60) NOT NULL;
