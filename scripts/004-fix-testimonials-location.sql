-- Fix for testimonials table - ensures location column exists
-- Run this if you get "column location does not exist" error

-- Check if location column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'testimonials' 
        AND column_name = 'location'
    ) THEN
        ALTER TABLE testimonials ADD COLUMN location VARCHAR(100);
    END IF;
END $$;

-- Clear any existing data to avoid conflicts
TRUNCATE TABLE testimonials;

-- Insert clean test data
INSERT INTO testimonials (customer_name, property_type, location, service, quote, rating, featured, display_order) VALUES
('Sarah M.', '1930s Semi-Detached', 'Swanage', 'Driveway Restoration', 'PowerWash Bros transformed our 1930s driveway. They took time to explain the biocide treatment and the results are stunning. Six months later and it still looks brand new!', 5, true, 1),
('James R.', 'Commercial Portfolio', 'Purbeck Area', 'Multiple Services', 'As a property manager across Purbeck, I have worked with many cleaning companies. PWB''s property-centred approach is genuine - they treat each building uniquely and their PowerUps products deliver consistently excellent results.', 5, true, 2),
('Elizabeth H.', 'Grade II Listed', 'Corfe Castle', 'Heritage Building', 'Our listed Purbeck stone building required specialist care and PWB delivered. They understood the heritage aspects and worked with such attention to detail. Highly recommend for historic properties.', 5, true, 3),
('David T.', 'Modern Detached', 'Swanage', 'Roof & Gutter Cleaning', 'Living in Purbeck means dealing with constant moss growth. PWB''s biocide treatment has kept our roof clean for over a year now. Worth every penny.', 5, true, 4),
('Margaret W.', 'Victorian Terrace', 'Wareham', 'Patio Cleaning', 'Our Purbeck stone patio was completely green. The transformation is incredible and they were so careful with the historic stonework.', 5, true, 5);
