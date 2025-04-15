// /api/roles/index.post.js

import db from '~/server/lib/db.cjs'
import { defineEventHandler, readBody, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)
  const { name, email } = await readBody(event)

  if (!name || !email) {
    throw createError({ statusCode: 400, statusMessage: 'Name and email are required' })
  }

  try {
    const [id] = await db('roles').insert({ name, email })
    return { success: true, message: 'Role created', id }
  } catch (error) {
    console.error('Error creating role:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to create role' })
  }
})
