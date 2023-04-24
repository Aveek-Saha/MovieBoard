/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `MovieBoard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdb_id` to the `MovieBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieBoard" ADD COLUMN     "tmdb_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MovieBoard_tmdb_id_key" ON "MovieBoard"("tmdb_id");
