-- Create admin accounts for Daniel and Santos

-- Check if admin users already exist before inserting
-- Updated emails to actual company emails: danicw@ and santoscw@
INSERT INTO admin_users (email, password_hash, full_name, role, is_active, created_at)
VALUES 
  ('danicw@powerwashbros.co.uk', 'PowerWash2025!Daniel', 'Daniel Calvo-Westcott', 'admin', true, NOW()),
  ('santoscw@powerwashbros.co.uk', 'PowerWash2025!Santos', 'Santos Calvo-Westcott', 'admin', true, NOW())
ON CONFLICT (email) DO UPDATE 
SET 
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Display the created accounts
SELECT email, full_name, role, is_active, created_at 
FROM admin_users 
WHERE email IN ('danicw@powerwashbros.co.uk', 'santoscw@powerwashbros.co.uk');
