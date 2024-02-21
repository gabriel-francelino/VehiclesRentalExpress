/*
  Warnings:

  - Changed the type of `driver_license` on the `customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DriverLicense" AS ENUM ('A', 'B', 'C', 'D', 'E', 'AB');

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "driver_license",
ADD COLUMN     "driver_license" "DriverLicense" NOT NULL,
ALTER COLUMN "hasRent" SET DEFAULT false;
