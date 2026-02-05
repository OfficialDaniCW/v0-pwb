-- Add password reset token table and columns
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add reset_requested_at and reset_email columns to admin_users if they don't exist
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS reset_requested_at TIMESTAMP;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS reset_email VARCHAR(255);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_reset_tokens_admin_id ON password_reset_tokens(admin_id);
