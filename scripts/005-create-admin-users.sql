-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  role VARCHAR(50) DEFAULT 'admin'
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Insert default admin user
-- Email: admin@powerwashbros.co.uk
-- Password: PWB2025Admin! (change this immediately after first login)
INSERT INTO admin_users (email, password_hash, full_name, is_active, role)
VALUES (
  'admin@powerwashbros.co.uk',
  'PWB2025Admin!',
  'PowerWash Bros Admin',
  true,
  'super_admin'
)
ON CONFLICT (email) DO NOTHING;

-- Add comment to table
COMMENT ON TABLE admin_users IS 'Admin user accounts for PowerWash Bros portal access';
COMMENT ON COLUMN admin_users.password_hash IS 'Plain text password for now - implement bcrypt hashing in production';
