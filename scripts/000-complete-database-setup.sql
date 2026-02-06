-- PowerWash Bros Complete Database Initialization
-- Run this to ensure all tables and data are properly set up

-- ============ BLOG POSTS ============
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

-- ============ TRANSFORMATIONS/GALLERY ============
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

-- ============ TESTIMONIALS ============
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

-- ============ SERVICE AREAS ============
CREATE TABLE IF NOT EXISTS service_areas (
  id SERIAL PRIMARY KEY,
  town_name VARCHAR(100) NOT NULL,
  postcode_area VARCHAR(10),
  county VARCHAR(50) DEFAULT 'Dorset',
  is_active BOOLEAN DEFAULT true
);

-- ============ QUOTE REQUESTS ============
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

-- ============ NEWSLETTER SUBSCRIBERS ============
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- ============ ADMIN USERS (with bcrypt ready structure) ============
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  role VARCHAR(50) DEFAULT 'admin',
  reset_requested_at TIMESTAMP,
  reset_email VARCHAR(255)
);

-- ============ PASSWORD RESET TOKENS ============
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============ NEWSLETTER CAMPAIGNS ============
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  header_image_url VARCHAR(500),
  cta_text VARCHAR(255),
  cta_url VARCHAR(500),
  subject_line VARCHAR(255) NOT NULL,
  target_group VARCHAR(50) DEFAULT 'all',
  status VARCHAR(20) DEFAULT 'draft',
  scheduled_for TIMESTAMP,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT,
  recipient_count INT DEFAULT 0,
  opened_count INT DEFAULT 0,
  clicked_count INT DEFAULT 0
);

-- ============ NEWSLETTER CAMPAIGN RECIPIENTS ============
CREATE TABLE IF NOT EXISTS newsletter_campaign_recipients (
  id SERIAL PRIMARY KEY,
  campaign_id INT NOT NULL REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
  subscriber_id INT NOT NULL REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending'
);

-- ============ NEWSLETTER SUBSCRIBER GROUPS ============
CREATE TABLE IF NOT EXISTS newsletter_subscriber_groups (
  id SERIAL PRIMARY KEY,
  subscriber_id INT NOT NULL REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  group_name VARCHAR(100) NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ CREATE ALL INDEXES ============
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_transformations_featured ON transformations(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status, created_at);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_reset_tokens_admin_id ON password_reset_tokens(admin_id);
CREATE INDEX IF NOT EXISTS idx_reset_tokens_expires_at ON password_reset_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON newsletter_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_scheduled ON newsletter_campaigns(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_campaign ON newsletter_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_sent ON newsletter_campaign_recipients(sent_at);
CREATE INDEX IF NOT EXISTS idx_subscriber_groups ON newsletter_subscriber_groups(subscriber_id, group_name);

-- ============ VERIFY TABLE CREATION ============
-- Check all tables exist
SELECT 
  tablename,
  'EXISTS' as status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
  'blog_posts', 'transformations', 'testimonials', 'service_areas',
  'quote_requests', 'newsletter_subscribers', 'admin_users',
  'password_reset_tokens', 'newsletter_campaigns',
  'newsletter_campaign_recipients', 'newsletter_subscriber_groups'
)
ORDER BY tablename;
