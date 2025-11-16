-- Fix missing columns in blog_posts table
-- Run this script if you get errors about missing columns

-- Add tags column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'blog_posts' 
        AND column_name = 'tags'
    ) THEN
        ALTER TABLE blog_posts ADD COLUMN tags TEXT[];
        RAISE NOTICE 'Added tags column to blog_posts table';
    ELSE
        RAISE NOTICE 'tags column already exists in blog_posts table';
    END IF;
END $$;

-- Add location column to testimonials if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'testimonials' 
        AND column_name = 'location'
    ) THEN
        ALTER TABLE testimonials ADD COLUMN location VARCHAR(100);
        RAISE NOTICE 'Added location column to testimonials table';
    ELSE
        RAISE NOTICE 'location column already exists in testimonials table';
    END IF;
END $$;

-- Verify all required columns exist
SELECT 
    'blog_posts' as table_name,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name = 'blog_posts'
AND column_name IN ('tags', 'category', 'published_at', 'is_published')
UNION ALL
SELECT 
    'testimonials' as table_name,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name = 'testimonials'
AND column_name IN ('location', 'property_type', 'service')
ORDER BY table_name, column_name;
