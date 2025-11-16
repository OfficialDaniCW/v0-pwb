-- PowerWash Bros Database Schema
-- Created for Neon PostgreSQL

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author VARCHAR(100) DEFAULT 'PowerWash Bros',
  category VARCHAR(50),
  tags TEXT[],
  published_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  read_time_minutes INT,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transformations/Gallery Table
CREATE TABLE IF NOT EXISTS transformations (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  location VARCHAR(100),
  service_type VARCHAR(100),
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  property_type VARCHAR(100),
  location VARCHAR(100),
  service VARCHAR(100),
  quote TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Service Areas Table
CREATE TABLE IF NOT EXISTS service_areas (
  id SERIAL PRIMARY KEY,
  town_name VARCHAR(100) NOT NULL,
  postcode_area VARCHAR(10),
  county VARCHAR(50) DEFAULT 'Dorset',
  is_active BOOLEAN DEFAULT true
);

-- Quote Requests Table
CREATE TABLE IF NOT EXISTS quote_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  property_type VARCHAR(50),
  service_needed VARCHAR(100),
  property_details TEXT,
  preferred_contact VARCHAR(20) DEFAULT 'whatsapp',
  heard_from VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_transformations_featured ON transformations(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status, created_at);
