-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "daily_rental" DOUBLE PRECISION NOT NULL,
    "isRented" BOOLEAN NOT NULL,
    "increase_porcentage" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_plate_key" ON "vehicle"("plate");
