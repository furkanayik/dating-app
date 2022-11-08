-- CreateEnum
CREATE TYPE "UserRelationTypes" AS ENUM ('REQUESTED', 'MATCHED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "attractedTo" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserMatchRequest" (
    "requestUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,

    CONSTRAINT "UserMatchRequest_pkey" PRIMARY KEY ("requestUserId","targetUserId")
);

-- CreateTable
CREATE TABLE "UserRelation" (
    "requestUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "relationStatus" "UserRelationTypes" NOT NULL,

    CONSTRAINT "UserRelation_pkey" PRIMARY KEY ("requestUserId","targetUserId")
);

-- AddForeignKey
ALTER TABLE "UserMatchRequest" ADD CONSTRAINT "UserMatchRequest_requestUserId_fkey" FOREIGN KEY ("requestUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMatchRequest" ADD CONSTRAINT "UserMatchRequest_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_requestUserId_fkey" FOREIGN KEY ("requestUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
