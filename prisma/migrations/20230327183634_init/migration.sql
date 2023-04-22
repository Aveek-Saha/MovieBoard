-- CreateEnum
CREATE TYPE "Role" AS ENUM ('reviewer', 'moderator');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "oauth_token" TEXT,
    "oauth_token_secret" TEXT,
    "expires_at" INTEGER,
    "refresh_token_expires_in" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "username" TEXT,
    "role" "Role" NOT NULL DEFAULT 'reviewer',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Reviewer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moderator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Moderator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieBoard" (
    "id" TEXT NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "genres" INTEGER[],
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MovieBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified" TIMESTAMP(3) NOT NULL,
    "boardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModeratorToMovieBoard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieBoardToReviewer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserLiked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Reviewer_userId_key" ON "Reviewer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Moderator_userId_key" ON "Moderator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_userId_key" ON "Review"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ModeratorToMovieBoard_AB_unique" ON "_ModeratorToMovieBoard"("A", "B");

-- CreateIndex
CREATE INDEX "_ModeratorToMovieBoard_B_index" ON "_ModeratorToMovieBoard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieBoardToReviewer_AB_unique" ON "_MovieBoardToReviewer"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieBoardToReviewer_B_index" ON "_MovieBoardToReviewer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLiked_AB_unique" ON "_UserLiked"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLiked_B_index" ON "_UserLiked"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviewer" ADD CONSTRAINT "Reviewer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderator" ADD CONSTRAINT "Moderator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "MovieBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Reviewer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModeratorToMovieBoard" ADD CONSTRAINT "_ModeratorToMovieBoard_A_fkey" FOREIGN KEY ("A") REFERENCES "Moderator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModeratorToMovieBoard" ADD CONSTRAINT "_ModeratorToMovieBoard_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieBoardToReviewer" ADD CONSTRAINT "_MovieBoardToReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "MovieBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieBoardToReviewer" ADD CONSTRAINT "_MovieBoardToReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviewer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLiked" ADD CONSTRAINT "_UserLiked_A_fkey" FOREIGN KEY ("A") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLiked" ADD CONSTRAINT "_UserLiked_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviewer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
