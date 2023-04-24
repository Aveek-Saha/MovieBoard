/*
  Warnings:

  - The primary key for the `Moderator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Moderator` table. All the data in the column will be lost.
  - The primary key for the `Reviewer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Reviewer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ModeratorToMovieBoard" DROP CONSTRAINT "_ModeratorToMovieBoard_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieBoardToReviewer" DROP CONSTRAINT "_MovieBoardToReviewer_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserLiked" DROP CONSTRAINT "_UserLiked_B_fkey";

-- DropIndex
DROP INDEX "Moderator_userId_key";

-- DropIndex
DROP INDEX "Reviewer_userId_key";

-- AlterTable
ALTER TABLE "Moderator" DROP CONSTRAINT "Moderator_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Moderator_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Reviewer" DROP CONSTRAINT "Reviewer_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Reviewer_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Reviewer"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModeratorToMovieBoard" ADD CONSTRAINT "_ModeratorToMovieBoard_A_fkey" FOREIGN KEY ("A") REFERENCES "Moderator"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieBoardToReviewer" ADD CONSTRAINT "_MovieBoardToReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviewer"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLiked" ADD CONSTRAINT "_UserLiked_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviewer"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
