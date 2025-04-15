import db from '~/server/lib/db.cjs'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const id = getRouterParam(event, 'id')

  try {
    const deleted = await db('livestock').where({ id }).del()

    if (!deleted) {
      throw createError({ statusCode: 404, statusMessage: 'Livestock not found' })
    }

    return { success: true, message: 'Livestock deleted' }
  } catch (error) {
    console.error('Error deleting livestock:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete livestock' })
  }
})
