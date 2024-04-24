-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('DONOR', 'RECEIVER', 'DISTRIBUTOR');

-- CreateEnum
CREATE TYPE "FoodRequestStatus" AS ENUM ('REQUESTED', 'ACCEPTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactNo" TEXT,
ADD COLUMN     "orgName" TEXT,
ADD COLUMN     "userType" "UserType";

-- CreateTable
CREATE TABLE "Food" (
    "foodId" SERIAL NOT NULL,
    "foodName" TEXT,
    "peopleToBeServed" TEXT,
    "venue" TEXT,
    "description" TEXT,
    "contactNo" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("foodId")
);

-- CreateTable
CREATE TABLE "FoodRequest" (
    "foodReqId" SERIAL NOT NULL,
    "foodRequestStatus" "FoodRequestStatus",
    "foodId" INTEGER NOT NULL,
    "requestingUserId" TEXT NOT NULL,
    "requestedDistributorId" TEXT NOT NULL,

    CONSTRAINT "FoodRequest_pkey" PRIMARY KEY ("foodReqId")
);

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodRequest" ADD CONSTRAINT "FoodRequest_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("foodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodRequest" ADD CONSTRAINT "FoodRequest_requestingUserId_fkey" FOREIGN KEY ("requestingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodRequest" ADD CONSTRAINT "FoodRequest_requestedDistributorId_fkey" FOREIGN KEY ("requestedDistributorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
