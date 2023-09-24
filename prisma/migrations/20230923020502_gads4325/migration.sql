/*
  Warnings:

  - You are about to drop the column `link` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `file` table. All the data in the column will be lost.
  - Added the required column `contentLength` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileNameBd` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "link",
DROP COLUMN "title",
ADD COLUMN     "contentLength" INTEGER NOT NULL,
ADD COLUMN     "contentType" TEXT NOT NULL,
ADD COLUMN     "fileName" VARCHAR(240) NOT NULL,
ADD COLUMN     "fileNameBd" VARCHAR(240) NOT NULL,
ADD COLUMN     "url" VARCHAR(240) NOT NULL,
ADD COLUMN     "usersId" INTEGER;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
