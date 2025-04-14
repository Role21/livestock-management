import { readBody, createError } from 'h3'
import jwt from 'jsonwebtoken'
import { db } from '~/server/lib/db.cjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

  // Check if admin exists
  const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email])
  const admin = rows[0]

  if (!admin || admin.password !== password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // Generate JWT
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: 'admin' },
    useRuntimeConfig().JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  }
})
