-- CreateTable
CREATE TABLE "rental" (
    "id" TEXT NOT NULL,
    "rental_date" TIMESTAMP(3) NOT NULL,
    "devolution_date" TIMESTAMP(3) NOT NULL,
    "rental_value" DOUBLE PRECISION NOT NULL,
    "customer_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
