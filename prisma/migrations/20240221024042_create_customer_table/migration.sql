-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "driver_license" TEXT NOT NULL,
    "hasRent" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_cpf_key" ON "customer"("cpf");
