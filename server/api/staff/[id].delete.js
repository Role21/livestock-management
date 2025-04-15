import db from '~/server/lib/db.cjs'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const id = parseInt(getRouterParam(event, 'id'))

  try {
    const staff = await db('staff').where({ id }).first()

    if (!staff) {
      throw createError({ statusCode: 404, statusMessage: 'Staff not found' })
    }

    // Optional: If the staff is linked to a user account
    if (staff.user_id) {
      await db('users').where({ id: staff.user_id }).del()
    }

    await db('staff').where({ id }).del()

    return {
      success: true,
      message: 'Staff member deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting staff:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete staff',
    })
  }
})
