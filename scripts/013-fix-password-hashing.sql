-- Fix remaining plain text passwords in admin_users table
-- This script hashes plain text passwords using PostgreSQL extensions

-- First, ensure pgcrypto extension exists for bcrypt-like hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- For danicw@powerwashbros.co.uk - hash "PowerWash2025!Daniel"
-- Using crypt function which is bcrypt-compatible
UPDATE admin_users
SET password_hash = crypt('PowerWash2025!Daniel', gen_salt('bf', 10))
WHERE email = 'danicw@powerwashbros.co.uk'
AND password_hash NOT LIKE '$2%'; -- Only if not already bcrypt hashed

-- For admin@powerwashbros.co.uk - verify it has proper hash, if not hash it
UPDATE admin_users
SET password_hash = crypt('PowerWash2025!AdminUser', gen_salt('bf', 10))
WHERE email = 'admin@powerwashbros.co.uk'
AND password_hash NOT LIKE '$2%'
AND password_hash NOT LIKE '$2a%';

-- Disable the third user (santoscw) if still active
UPDATE admin_users
SET is_active = FALSE
WHERE email = 'santoscw@powerwashbros.co.uk'
AND is_active = TRUE;
