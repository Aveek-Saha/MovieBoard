/*
  Warnings:

  - You are about to drop the column `rating` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MovieBoard" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "region" SET DEFAULT 'US';
