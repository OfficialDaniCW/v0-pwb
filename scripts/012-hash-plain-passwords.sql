-- First, disable the extra admin user (keeping the first 2 active)
UPDATE admin_users 
SET is_active = FALSE
WHERE email = 'santoscw@powerwashbros.co.uk';

-- Now hash the remaining plain text password
UPDATE admin_users 
SET password_hash = '$2a$10$3z5XbLx1PXAm/d1kkTKXaedFVh.TlRrTgbdpQpVNb5rCWJ2Ivu3P6'
WHERE email = 'danicw@powerwashbros.co.uk' AND password_hash = 'PowerWash2025!Daniel';

-- Verify the update
SELECT id, email, full_name, is_active FROM admin_users ORDER BY id;
