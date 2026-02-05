-- Admin User Setup with Bcrypt Password Hash
-- This creates/updates an admin user with a bcrypt-hashed password
-- Password: "PowerWash2024!" (change this in production)
-- Bcrypt hash generated with: bcrypt.hash("PowerWash2024!", 10)

INSERT INTO admin_users (email, password_hash, is_active, created_at, last_login)
VALUES (
  'admin@powerwashbros.co.uk',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye1epTN2HNm6r5fNlOqE7n8H5Qzx4r8K.',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMye1epTN2HNm6r5fNlOqE7n8H5Qzx4r8K.',
  is_active = true;

-- Verify setup
SELECT id, email, is_active, created_at FROM admin_users WHERE email = 'admin@powerwashbros.co.uk';
