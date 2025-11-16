-- Fix meta_title column length
-- SEO titles should be up to 60 characters but our brand name requires more space

-- Increase meta_title length to accommodate full titles
ALTER TABLE blog_posts 
ALTER COLUMN meta_title TYPE VARCHAR(120);

-- Now the seed data will work without truncation
