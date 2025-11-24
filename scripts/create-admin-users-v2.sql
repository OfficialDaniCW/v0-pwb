-- Create admin user accounts for Daniel and Santos
-- Passwords are stored as plain text here for initial setup
-- You should hash these passwords in production

-- Insert or update admin users
INSERT INTO admin_users (email, password_hash, full_name, role, is_active, created_at) 
VALUES 
  ('danicw@powerwashbros.co.uk', 'PowerWash2025!Daniel', 'Daniel Calvo-Westcott', 'admin', true, NOW()),
  ('santoscw@powerwashbros.co.uk', 'PowerWash2025!Santos', 'Santos Calvo-Westcott', 'admin', true, NOW())
ON CONFLICT (email) 
DO UPDATE 
SET 
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  is_active = EXCLUDED.is_active;
  -- Removed updated_at column reference as it doesn't exist in the table

-- Verify the accounts were created
SELECT id, email, full_name, role, is_active, created_at 
FROM admin_users 
WHERE email IN ('danicw@powerwashbros.co.uk', 'santoscw@powerwashbros.co.uk');
