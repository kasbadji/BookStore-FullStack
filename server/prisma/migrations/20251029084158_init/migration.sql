/*
  Warnings:

  - You are about to drop the column `passwords` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwords",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Book" (
    "bookId" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "bookPrice" DECIMAL(10,2) NOT NULL,
    "bookDescrpition" TEXT NOT NULL,
    "bookImage" TEXT NOT NULL,
    "bookStock" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_bookTitle_key" ON "Book"("bookTitle");
