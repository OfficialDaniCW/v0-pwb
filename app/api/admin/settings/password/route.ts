import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json()
    const email = request.headers.get('x-admin-email')

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
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
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await sql`
      UPDATE admin_users SET password_hash = ${hashedPassword} WHERE id = ${result[0].id}
    `

    return NextResponse.json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    console.error('[v0] Password change error:', error)
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
  }
}
