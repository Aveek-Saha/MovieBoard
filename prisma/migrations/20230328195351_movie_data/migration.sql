/*
  Warnings:

  - You are about to drop the column `backdrop_path` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `imdb_id` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `original_title` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `MovieBoard` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `MovieBoard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MovieBoard" DROP COLUMN "backdrop_path",
DROP COLUMN "genres",
DROP COLUMN "imdb_id",
DROP COLUMN "original_title",
DROP COLUMN "overview",
DROP COLUMN "poster_path",
DROP COLUMN "release_date",
DROP COLUMN "status",
DROP COLUMN "title";
