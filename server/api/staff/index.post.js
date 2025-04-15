import db from '~/server/lib/db.cjs'
import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcrypt'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const body = await readBody(event)
  const { first_name, last_name, email, phone, password, role_id } = body

  if (!first_name || !last_name || !email || !phone || !password || !role_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const [newStaffId] = await db('staff').insert({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
      role_id,
    })

    return {
      success: true,
      message: 'Staff member added successfully',
      id: newStaffId,
    }
  } catch (error) {
    console.error('Error adding staff:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add staff',
    })
  }
})
