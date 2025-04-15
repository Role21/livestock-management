// /api/roles/[id].get.js

import db from '~/server/lib/db.cjs'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)
  const id = getRouterParam(event, 'id')

  try {
    const role = await db('roles').where({ id }).first()
    if (!role) {
      throw createError({ statusCode: 404, statusMessage: 'Role not found' })
    }
    return { success: true, data: role }
  } catch (error) {
    console.error('Error fetching role:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch role' })
  }
})
