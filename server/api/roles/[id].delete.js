// /api/roles/[id].delete.js

import db from '~/server/lib/db.cjs'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)
  const id = getRouterParam(event, 'id')

  try {
    const deleted = await db('roles').where({ id }).del()
    if (!deleted) {
      throw createError({ statusCode: 404, statusMessage: 'Role not found' })
    }
    return { success: true, message: 'Role deleted' }
  } catch (error) {
    console.error('Error deleting role:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete role' })
  }
})
