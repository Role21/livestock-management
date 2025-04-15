import db from '~/server/lib/db.cjs'
import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import bcrypt from 'bcrypt'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const { first_name, last_name, email, phone, password, role_id } = body

  if (!first_name || !last_name || !email || !phone || !role_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  try {
    const updateData = {
      first_name,
      last_name,
      email,
      phone,
      role_id,
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    await db('staff').where({ id }).update(updateData)

    return {
      success: true,
      message: 'Staff member updated successfully',
    }
  } catch (error) {
    console.error('Error updating staff:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update staff',
    })
  }
})
