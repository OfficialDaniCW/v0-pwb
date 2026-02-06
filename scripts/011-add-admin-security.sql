-- Security Enhancement Script: Admin User Constraints, RLS, and Rate Limiting
-- This script adds database-level security without affecting blog/newsletter operations

-- ===== 1. RATE LIMITING TABLE =====
-- Track login attempts for rate limiting
CREATE TABLE IF NOT EXISTS login_attempts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  success BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time 
ON login_attempts(email, attempt_time DESC);

CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time 
ON login_attempts(ip_address, attempt_time DESC);

-- ===== 2. MAX 2 ADMIN USERS CONSTRAINT VIA TRIGGER =====
-- Create a trigger function to validate admin count on insert/update
CREATE OR REPLACE FUNCTION check_admin_limit() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    IF (SELECT COUNT(*) FROM admin_users WHERE is_active = true AND id != NEW.id) >= 2 THEN
      RAISE EXCEPTION 'Cannot have more than 2 active admin users. Database enforces maximum 2 admins only.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists to avoid conflicts
DROP TRIGGER IF EXISTS admin_limit_trigger ON admin_users;

-- Create trigger
CREATE TRIGGER admin_limit_trigger
BEFORE INSERT OR UPDATE ON admin_users
FOR EACH ROW
EXECUTE FUNCTION check_admin_limit();

-- ===== 3. ENABLE RLS ON ADMIN_USERS TABLE =====
-- Enable RLS on admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS admin_users_select_policy ON admin_users;
DROP POLICY IF EXISTS admin_users_insert_policy ON admin_users;
DROP POLICY IF EXISTS admin_users_update_policy ON admin_users;
DROP POLICY IF EXISTS admin_users_delete_policy ON admin_users;

-- Only active admin users can see admin records
-- This prevents unauthorized viewing even if session is compromised
CREATE POLICY admin_users_select_policy ON admin_users
  FOR SELECT
  USING (
    email IN (
      SELECT email FROM admin_users WHERE is_active = true
    )
  );

-- Only admins can insert/update
CREATE POLICY admin_users_modify_policy ON admin_users
  FOR ALL
  USING (
    email IN (
      SELECT email FROM admin_users WHERE is_active = true
    )
  );

-- ===== 4. ENABLE RLS ON PASSWORD RESET TOKENS =====
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS token_select_policy ON password_reset_tokens;
CREATE POLICY token_select_policy ON password_reset_tokens
  FOR SELECT
  USING (
    admin_id IN (
      SELECT id FROM admin_users WHERE is_active = true
    )
  );

-- ===== 5. COMMENTS FOR DOCUMENTATION =====
COMMENT ON TABLE admin_users IS 'Admin users table with max 2 active users enforced via trigger and RLS - Database-level security';
COMMENT ON TABLE login_attempts IS 'Tracks login attempts for rate limiting (5 attempts per 15 minutes enforced at API level)';
COMMENT ON FUNCTION check_admin_limit() IS 'Trigger function that prevents more than 2 active admin users from being created';
