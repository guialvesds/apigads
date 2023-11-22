-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "primary_name" VARCHAR(20) NOT NULL,
    "second_name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(240) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desktop" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link_access" VARCHAR(240) NOT NULL,
    "created_by" VARCHAR(80) NOT NULL,
    "user_id" INTEGER,
    "user_email" VARCHAR(200) NOT NULL,
    "created" BOOLEAN,

    CONSTRAINT "desktop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_date" TIMESTAMP(3),
    "desktopId" INTEGER,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_date" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "listId" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" VARCHAR(140) NOT NULL,
    "userAvatar" TEXT NOT NULL,
    "comment_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" SERIAL NOT NULL,
    "fileName" VARCHAR(240) NOT NULL,
    "fileNameBd" VARCHAR(240) NOT NULL,
    "url" VARCHAR(240) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentLength" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "cardId" INTEGER,
    "usersId" INTEGER,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupCard" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToDesktop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_groupToDesktop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_goupeToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToDesktop_AB_unique" ON "_UserToDesktop"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToDesktop_B_index" ON "_UserToDesktop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_groupToDesktop_AB_unique" ON "_groupToDesktop"("A", "B");

-- CreateIndex
CREATE INDEX "_groupToDesktop_B_index" ON "_groupToDesktop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToCard_AB_unique" ON "_UserToCard"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToCard_B_index" ON "_UserToCard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_goupeToCard_AB_unique" ON "_goupeToCard"("A", "B");

-- CreateIndex
CREATE INDEX "_goupeToCard_B_index" ON "_goupeToCard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToTask_AB_unique" ON "_UserToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToTask_B_index" ON "_UserToTask"("B");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_desktopId_fkey" FOREIGN KEY ("desktopId") REFERENCES "desktop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToDesktop" ADD CONSTRAINT "_UserToDesktop_A_fkey" FOREIGN KEY ("A") REFERENCES "desktop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToDesktop" ADD CONSTRAINT "_UserToDesktop_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupToDesktop" ADD CONSTRAINT "_groupToDesktop_A_fkey" FOREIGN KEY ("A") REFERENCES "desktop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupToDesktop" ADD CONSTRAINT "_groupToDesktop_B_fkey" FOREIGN KEY ("B") REFERENCES "groupCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToCard" ADD CONSTRAINT "_UserToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToCard" ADD CONSTRAINT "_UserToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_goupeToCard" ADD CONSTRAINT "_goupeToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_goupeToCard" ADD CONSTRAINT "_goupeToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "groupCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTask" ADD CONSTRAINT "_UserToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTask" ADD CONSTRAINT "_UserToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
