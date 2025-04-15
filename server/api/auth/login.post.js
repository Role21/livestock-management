import { defineEventHandler, readBody, setCookie } from 'h3'
import jwt from 'jsonwebtoken'
import db from '~/server/lib/db.cjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Validate admin from DB
  const admin = await db('admins').where({ email }).first()

  if (!admin) {
    return createError({ statusCode: 401, statusMessage: 'Invalid email' })
  }

  const passwordMatches = await bcrypt.compare(password, admin.password)
  if (!passwordMatches) {
    return createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  // Generate JWT token
  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  // ✅ Store it as a cookie for client
  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { success: true, message: 'Login successful' }
})
