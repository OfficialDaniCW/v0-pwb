# PowerWash Bros - Database Integration & Security Report

**Last Updated:** February 5, 2026

---

## ✅ Database Integration Status

### Connected to Neon PostgreSQL
- **Database:** soft-river-07108909
- **Connection:** Using `@neondatabase/serverless` with DATABASE_URL environment variable
- **Connection Type:** Secure, encrypted connections only

---

## 🔐 Security Implementation

### 1. Authentication System
**Status:** ✅ Fully Implemented

- **Location:** `/app/api/admin/auth/route.ts`
- **Password Storage:** bcrypt hashing (10 salt rounds)
- **Password Validation:** 
  - Email format validation
  - Password comparison using bcrypt.compare()
  - Constant-time comparison to prevent timing attacks
- **Session Management:**
  - HTTP-only cookie: `admin-session` with SameSite=Strict
  - 24-hour expiration
  - localStorage backup (email/id)

**Credentials:**
- Email: `admin@powerwashbros.co.uk`
- Password: `PowerWash2024!` (bcrypt hashed in database)

**Login Flow:**
1. User submits email/password
2. POST to `/api/admin/auth`
3. Query Neon for admin_users table
4. bcrypt comparison with stored hash
5. Update last_login timestamp
6. Return session token

---

### 2. Password Reset System
**Status:** ✅ Fully Implemented

- **Location:** 
  - Request: `/app/api/admin/forgot-password/route.ts`
  - Reset: `/app/api/admin/reset-password/route.ts`

**Security Features:**
- **Token Generation:** 32-byte cryptographic random tokens (crypto.randomBytes)
- **Token Storage:** In `password_reset_tokens` table with admin_id foreign key
- **Token Expiration:** 24 hours from generation
- **One-Time Use:** Tokens marked as used after successful reset
- **Email Enumeration Protection:** Returns success message regardless of whether email exists
- **No Plaintext Passwords:** All passwords hashed with bcrypt before storage

**Password Reset Flow:**
1. User enters email on `/admin/forgot-password`
2. System generates random 32-byte token
3. Token stored in password_reset_tokens table with 24-hour expiration
4. Token link sent (or displayed in dev mode)
5. User clicks reset link with token
6. New password hashed with bcrypt
7. Password updated in admin_users table
8. Token marked as used
9. User redirected to login

**Password Reset Access:**
- URL: `https://www.powerwashbros.co.uk/admin/forgot-password`
- Works as expected - generates reset tokens and stores in Neon

---

### 3. Data Access Control
**Status:** ✅ Configured

- **Admin Dashboard:** Protected by session authentication
- **API Routes:** Accept authenticated requests from admin panel
- **Public APIs:** 
  - `/api/portfolio` - Returns featured transformations (public)
  - `/api/blog` - Returns published blog posts (public)
  - `/api/transformations` - Returns featured transformations (public)

---

## 📊 Data Integration with Neon

### Fully Integrated (Pulling from Neon)
- ✅ **Admin Users** - Neon table: `admin_users`
- ✅ **Password Reset Tokens** - Neon table: `password_reset_tokens`
- ✅ **Transformations/Gallery** - Neon table: `transformations`
- ✅ **Quote Requests** - Neon table: `quote_requests`
- ✅ **Newsletter Subscribers** - Neon table: `newsletter_subscribers`
- ✅ **Newsletter Campaigns** - Neon table: `newsletter_campaigns`

### Partially Integrated
- ⚠️ **Portfolio Projects** - Now auto-seeding to Neon from static data
- ⚠️ **Blog Posts** - Still using static data from `/lib/blog-posts.tsx`

### Static Data (Not in Neon)
- Blog posts (recommend migrating to Neon)
- Testimonials (recommend migrating to Neon)

---

## 🔒 Security Best Practices Implemented

### ✅ Implemented
1. **Bcrypt Password Hashing** - 10 salt rounds, industry standard
2. **Cryptographic Token Generation** - 32-byte random tokens
3. **HTTP-Only Cookies** - SameSite=Strict for CSRF protection
4. **SQL Parameterization** - All queries use parameterized statements via Neon client
5. **Email Enumeration Protection** - Forgot password doesn't reveal if email exists
6. **Token Expiration** - 24-hour expiration on reset tokens
7. **One-Time Use Tokens** - Reset tokens can only be used once
8. **Secure Connection** - All Neon connections are encrypted
9. **Environment Variables** - DATABASE_URL stored securely in Vercel

### ⚠️ Recommendations
1. **Enable Neon Row-Level Security (RLS)** - Add RLS policies to sensitive tables
2. **Rate Limiting** - Add rate limiting to login and password reset endpoints
3. **Email Verification** - Send actual emails for password reset (currently logs to console)
4. **2FA Support** - Consider adding two-factor authentication
5. **Session Timeout** - Add server-side session invalidation
6. **Audit Logging** - Log all admin actions to a separate audit table

---

## 🗄️ Database Tables

### admin_users
```sql
- id (PRIMARY KEY)
- email (UNIQUE)
- password_hash (bcrypt)
- full_name
- is_active (BOOLEAN)
- created_at
- last_login
- role
- reset_requested_at
- reset_email
```

### password_reset_tokens
```sql
- id (PRIMARY KEY)
- admin_id (FOREIGN KEY → admin_users)
- token (UNIQUE)
- expires_at
- used_at (nullable - marked when used)
- created_at
```

### transformations
```sql
- id (PRIMARY KEY)
- title
- before_image_url
- after_image_url
- service_type
- location
- description
- featured (BOOLEAN)
- display_order
- created_at
```

### newsletter_subscribers
```sql
- id (PRIMARY KEY)
- email (UNIQUE)
- subscribed_at
- is_active (BOOLEAN)
```

### newsletter_campaigns
```sql
- id (PRIMARY KEY)
- title
- description
- content
- header_image_url
- cta_text
- cta_url
- subject_line
- target_group
- status (draft/scheduled/sent)
- scheduled_for
- sent_at
- created_at
- updated_at
- created_by
- recipient_count
- opened_count
- clicked_count
```

### quote_requests
```sql
- id (PRIMARY KEY)
- name
- email
- phone
- postcode
- property_type
- service_needed
- property_details
- preferred_contact
- heard_from
- status (new/contacted/completed)
- created_at
```

---

## 🧪 Testing the Integration

### Test Login
```
Email: admin@powerwashbros.co.uk
Password: PowerWash2024!
URL: https://www.powerwashbros.co.uk/admin/login
```

### Test Password Reset
1. Go to `/admin/forgot-password`
2. Enter: `admin@powerwashbros.co.uk`
3. In development, reset link appears in console
4. Click reset link and set new password
5. New password is hashed and stored in Neon

### Test Portfolio API
```bash
curl https://www.powerwashbros.co.uk/api/portfolio
# Returns transformations from Neon database
```

---

## 📝 Implementation Notes

- All authentication uses Neon as the source of truth
- Password hashes are never logged or displayed
- Reset tokens are single-use only
- Database connections use Neon's serverless driver for optimal performance
- All API routes handle errors gracefully with fallbacks

---

## 🚀 Next Steps to Improve

1. Migrate blog posts to Neon for full CMS functionality
2. Migrate testimonials to Neon
3. Implement email sending for password reset links
4. Add RLS policies to Neon tables
5. Implement rate limiting on auth endpoints
6. Add admin action audit logging
7. Consider implementing 2FA for admin accounts
