// server/api/auth/me.get.js
import jwt from 'jsonwebtoken'
import { getHeader, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Missing token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return { user: decoded }
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }
})
