// /api/roles/index.get.js

import db from '~/server/lib/db.cjs'
import { defineEventHandler, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)
  try {
    const roles = await db('roles').select('id', 'name', 'email').orderBy('name')
    return { success: true, data: roles }
  } catch (error) {
    console.error('Error fetching roles:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch roles' })
  }
})
