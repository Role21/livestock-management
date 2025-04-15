import db from '~/server/lib/db.cjs'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const id = parseInt(getRouterParam(event, 'id'))

  try {
    const staff = await db('staff')
      .select(
        'staff.id',
        'staff.first_name',
        'staff.last_name',
        'staff.email',
        'staff.phone',
        'staff.role_id',
        'roles.name as role_name',
        'staff.created_at'
      )
      .leftJoin('roles', 'staff.role_id', 'roles.id')
      .where('staff.id', id)
      .first()

    if (!staff) {
      throw createError({ statusCode: 404, statusMessage: 'Staff not found' })
    }

    return {
      success: true,
      data: staff,
    }
  } catch (error) {
    console.error('Error fetching staff member:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch staff member',
    })
  }
})
