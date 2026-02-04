-- Newsletter Campaigns Table
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

-- Newsletter Campaign Recipients (for tracking delivery and engagement)
CREATE TABLE IF NOT EXISTS newsletter_campaign_recipients (
  id SERIAL PRIMARY KEY,
  campaign_id INT NOT NULL REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
  subscriber_id INT NOT NULL REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending'
);

-- Newsletter Subscriber Groups/Tags
CREATE TABLE IF NOT EXISTS newsletter_subscriber_groups (
  id SERIAL PRIMARY KEY,
  subscriber_id INT NOT NULL REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  group_name VARCHAR(100) NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON newsletter_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_scheduled ON newsletter_campaigns(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_campaign ON newsletter_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_sent ON newsletter_campaign_recipients(sent_at);
CREATE INDEX IF NOT EXISTS idx_subscriber_groups ON newsletter_subscriber_groups(subscriber_id, group_name);
