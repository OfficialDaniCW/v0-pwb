-- Fix for testimonials table
-- The testimonials table already has location column, this ensures data integrity

-- Update any existing records that might have issues
-- This script is safe to run multiple times
ALTER TABLE testimonials ALTER COLUMN location TYPE VARCHAR(100);
ALTER TABLE testimonials ALTER COLUMN location DROP NOT NULL;
