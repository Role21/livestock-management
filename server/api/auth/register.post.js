// server/api/auth/register.post.js
import { db } from '~/server/lib/db.cjs'
import bcrypt from 'bcrypt'
import { getHeader, createError, defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'authorization')
  const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN

  if (token !== `Bearer ${ADMIN_TOKEN}`) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing username or password' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword])

  return { message: 'Admin registered successfully' }
})
