import { getHeader, createError, defineEventHandler } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  console.log('AUTH TOKEN RECEIVED:', token)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No token provided',
    })
  }

  try {
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret)

    // Optional: Attach user info to the event context
    event.context.user = decoded
  } catch (err) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid token',
    })
  }
})
