-- Execute this if the password reset tables haven't been created yet
-- This adds the necessary columns and tables for the password reset flow

-- Create password_reset_tokens table if it doesn't exist
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add columns to admin_users if they don't exist
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS reset_requested_at TIMESTAMP;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS reset_email VARCHAR(255);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_reset_tokens_admin_id ON password_reset_tokens(admin_id);
CREATE INDEX IF NOT EXISTS idx_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- Clean up expired tokens (optional - run periodically)
DELETE FROM password_reset_tokens 
WHERE expires_at < NOW() AND used_at IS NULL;
