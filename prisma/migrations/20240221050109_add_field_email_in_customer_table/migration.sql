/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rental" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vehicle" ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");
