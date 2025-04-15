import db from '~/server/lib/db.cjs'
import { defineEventHandler, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  // Ensure request is authenticated
  await auth(event)

  try {
    const staff = await db('staff')
      .leftJoin('roles', 'staff.role_id', 'roles.id')
      .select(
        'staff.id',
        'staff.first_name',
        'staff.last_name',
        'staff.email',
        'staff.phone',
        'roles.name as role',
        'staff.created_at'
      )
      .orderBy('staff.created_at', 'desc')

    return {
      success: true,
      data: staff,
    }
  } catch (error) {
    console.error('Error fetching staff:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch staff',
    })
  }
})
