/*
  Warnings:

  - You are about to drop the column `heading` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "heading";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "region" TEXT;
