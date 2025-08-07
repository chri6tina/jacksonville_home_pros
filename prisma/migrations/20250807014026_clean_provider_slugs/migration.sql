-- Clean up provider slugs by removing ID suffixes
-- This will make URLs cleaner and more professional

-- Update Metro Rooter slug
UPDATE "providers" 
SET "slug" = 'metro-rooter' 
WHERE "businessName" = 'Metro Rooter';

-- Update David Gray Plumbing slug  
UPDATE "providers" 
SET "slug" = 'david-gray-plumbing' 
WHERE "businessName" = 'David Gray Plumbing';