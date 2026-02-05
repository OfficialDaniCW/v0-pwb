import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const timestamp = new Date().toLocaleString('en-GB', { 
      timeZone: 'Europe/London',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Send email notification
    const emailSent = await sendFormattedEmail(name, email, phone, subject, message, timestamp)

    // Send WhatsApp notification
    const whatsappSent = await sendWhatsAppNotification(name, email, phone, subject, message)

    // At least one notification method should succeed
    if (!emailSent && !whatsappSent) {
      console.error('[Contact API] Both email and WhatsApp failed')
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message received successfully. We will get back to you within 24 hours.'
    })
  } catch (error) {
    console.error('[Contact API] Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}

async function sendFormattedEmail(
  name: string,
  email: string,
  phone: string | undefined,
  subject: string,
  message: string,
  timestamp: string
): Promise<boolean> {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.warn('[Contact API] RESEND_API_KEY not configured - email skipped')
      return false
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; }
      .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(135deg, #1E90FF 0%, #1E7DD8 100%); color: white; padding: 30px 20px; }
      .header h1 { margin: 0; font-size: 24px; }
      .header p { margin: 5px 0 0 0; opacity: 0.9; }
      .content { padding: 30px 20px; }
      .field-group { margin-bottom: 20px; }
      .field-label { font-weight: 600; color: #1E90FF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
      .field-value { color: #333; margin-top: 5px; font-size: 15px; padding: 8px 12px; background-color: #f5f5f5; border-radius: 4px; }
      .message-section { margin-top: 25px; padding: 20px; background-color: #f0f7ff; border-left: 4px solid #1E90FF; border-radius: 4px; }
      .message-section .field-label { color: #1E90FF; }
      .message-content { margin-top: 10px; white-space: pre-wrap; color: #333; line-height: 1.7; }
      .divider { margin: 20px 0; border-top: 1px solid #e0e0e0; }
      .footer { background-color: #f9f9f9; padding: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666; }
      .footer a { color: #1E90FF; text-decoration: none; }
      .cta-section { text-align: center; margin-top: 20px; padding: 20px; background-color: #e8f4ff; border-radius: 4px; }
      .cta-section p { margin: 0; color: #1E90FF; }
      .whatsapp-badge { display: inline-block; background-color: #00C853; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px; margin-top: 10px; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📧 New Contact Form Submission</h1>
        <p>PowerWash Bros Website</p>
      </div>

      <div class="content">
        <div class="field-group">
          <div class="field-label">👤 Name</div>
          <div class="field-value">${sanitizeHtml(name)}</div>
        </div>

        <div class="field-group">
          <div class="field-label">📧 Email</div>
          <div class="field-value"><a href="mailto:${sanitizeHtml(email)}">${sanitizeHtml(email)}</a></div>
        </div>

        ${phone ? `
        <div class="field-group">
          <div class="field-label">📱 Phone</div>
          <div class="field-value">${sanitizeHtml(phone)}</div>
        </div>
        ` : ''}

        <div class="field-group">
          <div class="field-label">📌 Subject</div>
          <div class="field-value">${sanitizeHtml(subject)}</div>
        </div>

        <div class="message-section">
          <div class="field-label">💬 Message</div>
          <div class="message-content">${sanitizeHtml(message)}</div>
        </div>

        <div class="divider"></div>

        <div class="field-group">
          <div class="field-label">⏰ Submitted</div>
          <div class="field-value">${timestamp} (UK Time)</div>
        </div>

        <div class="cta-section">
          <p>💡 Tip: Reply to this email to contact the customer directly</p>
          ${phone ? `<span class="whatsapp-badge">☎️ Phone available for follow-up</span>` : ''}
        </div>
      </div>

      <div class="footer">
        <p>This message was submitted via the PowerWash Bros contact form</p>
        <p><a href="https://powerwashbros.co.uk">Visit PowerWash Bros</a></p>
        <p>© 2026 PowerWash Bros. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
    `.trim()

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: 'info@powerwashbros.co.uk',
        reply_to: email,
        subject: `New Contact: ${name} - ${subject}`,
        html: htmlContent
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[Contact API] Email send failed:', error)
      return false
    }

    console.log('[Contact API] Email sent successfully to info@powerwashbros.co.uk')
    return true
  } catch (error) {
    console.error('[Contact API] Email sending error:', error)
    return false
  }
}

async function sendWhatsAppNotification(
  name: string,
  email: string,
  phone: string | undefined,
  subject: string,
  message: string
): Promise<boolean> {
  try {
    const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
    const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM

    // If Twilio is not configured, silently return true (email is primary)
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
      console.log('[Contact API] Twilio not configured - WhatsApp notification skipped')
      return true
    }

    // Format message for WhatsApp (concise, emoji-friendly)
    const whatsappMessage = `
🔔 *New Contact Form Message* 🔔

*From:* ${name}
*Email:* ${email}
${phone ? `*Phone:* ${phone}\n` : ''}*Subject:* ${subject}

*Message:*
${message}

---
${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
    `.trim()

    // Format phone number for WhatsApp
    const recipientPhone = formatPhoneNumber(phone || '07418610731')

    const params = new URLSearchParams()
    params.append('From', `whatsapp:${TWILIO_WHATSAPP_FROM}`)
    params.append('To', `whatsapp:+${recipientPhone}`)
    params.append('Body', whatsappMessage)

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('[Contact API] WhatsApp send failed:', error)
      return false
    }

    console.log('[Contact API] WhatsApp notification sent successfully')
    return true
  } catch (error) {
    console.error('[Contact API] WhatsApp sending error:', error)
    // Don't fail the whole request if WhatsApp fails, as email is primary
    return true
  }
}

function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')

  // If it's a UK number starting with 0, replace with 44
  if (cleaned.startsWith('0')) {
    return '44' + cleaned.slice(1)
  }

  // If it doesn't start with country code, assume UK
  if (!cleaned.startsWith('44')) {
    return '44' + cleaned
  }

  return cleaned
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
