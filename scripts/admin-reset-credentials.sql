-- Admin User Credential Reset/Setup
-- This script creates or updates an admin user with new credentials
-- Replace the values below with your desired credentials

-- Option 1: Insert new admin user (if table is empty)
INSERT INTO admin_users (email, password_hash, is_active, created_at, last_login)
VALUES (
  'admin@powerwashbros.co.uk',
  'YourSecurePasswordHere',  -- Replace with your actual password
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = 'YourSecurePasswordHere',  -- Replace with your actual password
  is_active = true,
  last_login = NOW();

-- Verify the user was created/updated
SELECT id, email, is_active, created_at FROM admin_users WHERE email = 'admin@powerwashbros.co.uk';
