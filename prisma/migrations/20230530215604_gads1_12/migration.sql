/*
  Warnings:

  - Added the required column `link` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "link" VARCHAR(240) NOT NULL;

-- AlterTable
ALTER TABLE "listTask" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
