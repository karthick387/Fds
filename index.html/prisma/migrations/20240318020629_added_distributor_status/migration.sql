-- CreateEnum
CREATE TYPE "DistributorStatus" AS ENUM ('READY', 'PICKEDUP', 'DISTRIBUTED');

-- AlterTable
ALTER TABLE "FoodRequest" ADD COLUMN     "distributorStatus" "DistributorStatus";
