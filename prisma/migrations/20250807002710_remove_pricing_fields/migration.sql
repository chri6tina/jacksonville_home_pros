/*
  Warnings:

  - You are about to drop the column `price` on the `provider_services` table. All the data in the column will be lost.
  - You are about to drop the column `priceType` on the `provider_services` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `providers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "provider_services" DROP COLUMN "price",
DROP COLUMN "priceType";

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "hourlyRate";

-- DropEnum
DROP TYPE "PriceType";
