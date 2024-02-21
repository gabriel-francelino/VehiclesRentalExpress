/*
  Warnings:

  - Changed the type of `type` on the `vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTOCYCLE');

-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "type",
ADD COLUMN     "type" "VehicleType" NOT NULL;
