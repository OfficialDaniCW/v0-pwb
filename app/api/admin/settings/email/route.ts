import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function POST(request: Request) {
  try {
    const { newEmail, currentPassword } = await request.json()
    const email = request.headers.get('x-admin-email')

    if (!email || !newEmail || !currentPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if new email already exists
    const existingEmail = await sql`
      SELECT id FROM admin_users WHERE email = ${newEmail} LIMIT 1
    `

    if (existingEmail.length > 0) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    // Get current admin user
    const result = await sql`
      SELECT id, password_hash FROM admin_users WHERE email = ${email} LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, result[0].password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Password is incorrect' }, { status: 401 })
    }

    // Update email
    await sql`
      UPDATE admin_users SET email = ${newEmail} WHERE id = ${result[0].id}
    `

    return NextResponse.json({ success: true, message: 'Email updated successfully' })
  } catch (error) {
    console.error('[v0] Email change error:', error)
    return NextResponse.json({ error: 'Failed to update email' }, { status: 500 })
  }
}
