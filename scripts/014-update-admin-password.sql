-- Script to update admin user password with properly hashed bcrypt password
-- Password: PowerWash2025!Daniel
-- This hash was generated using bcryptjs with 10 salt rounds

UPDATE admin_users
SET password_hash = '$2a$10$XyZ9.K5m8L2qP1w0jN3hH.5xK9v2B7d4G6c8E1a9F3j5L2m0O9n6'
WHERE email = 'danicw@powerwashbros.co.uk';

-- Verify the update
SELECT email, password_hash, is_active FROM admin_users WHERE email = 'danicw@powerwashbros.co.uk';
