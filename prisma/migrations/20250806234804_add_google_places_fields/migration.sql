-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "googlePlacesId" TEXT,
ADD COLUMN     "googleRating" DOUBLE PRECISION,
ADD COLUMN     "googleReviewCount" INTEGER;
