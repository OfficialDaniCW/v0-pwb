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

    // Create email content
    const emailContent = `
New Contact Form Submission from PowerWash Bros Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
Sent from PowerWash Bros Contact Form
${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
    `.trim()

    // In production, this would integrate with an email service like Resend, SendGrid, or AWS SES
    // For now, we'll use a simple mailto approach or a third-party service
    
    // Example with Resend (you'll need to add RESEND_API_KEY to environment variables)
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    
    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'website@powerwashbros.co.uk',
          to: 'info@powerwashbros.co.uk',
          subject: `Contact Form: ${subject}`,
          text: emailContent,
          reply_to: email
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send email via Resend')
      }
    } else {
      // Fallback: Log to console for development
      console.log('[v0] Contact form submission:', emailContent)
      
      // You could also integrate with other email services here
      // Example: SendGrid, AWS SES, Postmark, etc.
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.error('[v0] Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
