/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `providers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `providers` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Add the slug column as nullable first
ALTER TABLE "providers" ADD COLUMN "slug" TEXT;

-- Step 2: Populate existing records with slugs based on business name
UPDATE "providers" 
SET "slug" = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          "businessName", 
          '[^a-zA-Z0-9\s-]', '', 'g'
        ),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    ),
    '^-+|-+$', '', 'g'
  )
) || '-' || SUBSTRING("id" FROM 1 FOR 8);

-- Step 3: Make the slug column required
ALTER TABLE "providers" ALTER COLUMN "slug" SET NOT NULL;

-- Step 4: Create unique index
CREATE UNIQUE INDEX "providers_slug_key" ON "providers"("slug");
