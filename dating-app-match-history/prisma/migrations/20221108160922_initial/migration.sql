-- CreateTable
CREATE TABLE "UserMatchHistory" (
    "id" SERIAL NOT NULL,
    "requestingUserId" TEXT NOT NULL,
    "targerUserId" TEXT NOT NULL,
    "matchTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRequestHistory" (
    "id" SERIAL NOT NULL,
    "requestingUserId" TEXT NOT NULL,
    "targerUserId" TEXT NOT NULL,
    "requestTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRequestHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRejectHistory" (
    "id" SERIAL NOT NULL,
    "requestingUserId" TEXT NOT NULL,
    "targerUserId" TEXT NOT NULL,
    "rejectTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRejectHistory_pkey" PRIMARY KEY ("id")
);
