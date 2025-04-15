// /api/roles/[id].put.js

import db from '~/server/lib/db.cjs'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)
  const id = getRouterParam(event, 'id')
  const { name, email } = await readBody(event)

  if (!name || !email) {
    throw createError({ statusCode: 400, statusMessage: 'Name and email are required' })
  }

  try {
    const updated = await db('roles').where({ id }).update({ name, email })
    if (!updated) {
      throw createError({ statusCode: 404, statusMessage: 'Role not found' })
    }
    return { success: true, message: 'Role updated' }
  } catch (error) {
    console.error('Error updating role:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to update role' })
  }
})
