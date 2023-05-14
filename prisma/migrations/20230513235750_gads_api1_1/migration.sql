-- AlterTable
ALTER TABLE "card" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "delivery_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "delivery_date" DROP NOT NULL;
