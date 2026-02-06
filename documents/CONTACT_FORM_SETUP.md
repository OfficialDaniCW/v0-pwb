# Contact Form Setup Guide

## Overview
Your contact form is fully functional and can send messages via:
1. **Email** - Beautifully formatted HTML emails to info@powerwashbros.co.uk
2. **WhatsApp** - Formatted text messages (optional)

## How It Works

When a customer submits the contact form from `/contact`:
- Form data is validated (name, email, subject, message required)
- Email is sent to `info@powerwashbros.co.uk` with the customer's contact details
- Optional: WhatsApp notification is sent with a concise summary
- Customer sees a success message: "Thank you! We'll get back to you within 24 hours."

## Email Formatting

The email sent includes:
- **Header** with PowerWash Bros branding
- **Customer Info**: Name, Email, Phone, Subject clearly labeled
- **Message** in highlighted section with proper formatting
- **Timestamp** showing when submitted
- **CTA** encouraging direct reply to customer email
- **Professional footer** with company info

## Setting Up Email Notifications (REQUIRED)

### Using Resend (Recommended)

1. Go to https://resend.com
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add to your Vercel environment variables:
   - Go to your project Settings → Environment Variables
   - Add key: `RESEND_API_KEY`
   - Value: Your Resend API key from step 3
5. Redeploy your project

**Testing Email:**
- Visit `/contact`
- Fill out the form with test data
- Submit
- You should receive a formatted email at info@powerwashbros.co.uk

## Setting Up WhatsApp Notifications (OPTIONAL)

WhatsApp setup provides a backup notification channel, but email alone is sufficient.

### Using Twilio

1. Go to https://www.twilio.com
2. Create an account and verify your phone number
3. From the Console, get:
   - **Account SID** (Settings → General)
   - **Auth Token** (Settings → General)
4. Enable WhatsApp:
   - Messaging → Send WhatsApp → Sandbox (for testing)
   - Follow Twilio's WhatsApp sandbox instructions
5. Get your WhatsApp-enabled Twilio number (format: +1XXXXX)
6. Add to Vercel environment variables:
   - `TWILIO_ACCOUNT_SID` - Your Account SID
   - `TWILIO_AUTH_TOKEN` - Your Auth Token
   - `TWILIO_WHATSAPP_FROM` - Your WhatsApp Twilio number (e.g., +1234567890)

**Important**: Twilio WhatsApp has different requirements per region. The setup may vary based on your location.

## Testing the Form

### Test Case 1: Basic Submission
```
Name: John Smith
Email: john@example.com
Phone: 07418 610731
Subject: Roof Cleaning Quote
Message: I'd like a quote for my slate roof in Swanage
```
Expected: Email arrives at info@powerwashbros.co.uk with formatted content

### Test Case 2: Without Phone
```
Name: Jane Doe
Email: jane@example.com
Phone: (leave blank)
Subject: Driveway Stains
Message: How much would moss removal cost?
```
Expected: Email sent without phone field

## What Customers See

### Success Message
```
✅ Thank you! We'll get back to you within 24 hours.
```

### Error Message (if email service fails)
```
❌ Message not sent
Failed to send message. Please try WhatsApp or email directly.

💡 Tip: Please try WhatsApp or call directly for immediate assistance.
```

## Email Content Example

**Subject:** New Contact: Jane Doe - Driveway Stains

**Email contains:**
- Customer name prominently displayed
- Reply-to automatically set to customer email
- Subject line clearly shows what customer needs help with
- Full message preserved with line breaks
- Timestamp in UK time
- Direct reply option

## Troubleshooting

### Email not arriving
1. Check Resend API key is correct in Vercel environment
2. Verify RESEND_API_KEY is spelled exactly right (case-sensitive)
3. Check spam/junk folder
4. Verify info@powerwashbros.co.uk email is correct

### Form shows error
1. Check browser console for error details
2. Verify all required fields filled (name, email, subject, message)
3. Test with valid email format
4. Check Vercel function logs for API errors

### WhatsApp not working (non-critical)
- WhatsApp is optional - email is primary
- Email will still send successfully
- WhatsApp only fails if Twilio credentials are wrong or service is down

## Files Involved

- `/app/contact/page.tsx` - Contact form UI and submission logic
- `/app/api/contact/route.ts` - Backend API handling email and WhatsApp
- Environment variables: `RESEND_API_KEY`, `TWILIO_*` (optional)

## Customization

### Change recipient email
Edit `/app/api/contact/route.ts` line 26:
```typescript
to: 'your-email@powerwashbros.co.uk',
```

### Change response message
Edit `/app/contact/page.tsx` line 113:
```typescript
message: 'Your custom success message here!'
```

### Add more form fields
1. Add to form in `/app/contact/page.tsx`
2. Update validation in `/app/api/contact/route.ts`
3. Include in email template HTML
