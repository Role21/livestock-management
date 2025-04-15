import db from '~/server/lib/db.cjs'
import { defineEventHandler, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  try {
    const livestock = await db('livestock')
      .select(
        'livestock.*',
        'animal_variants.name as variant_name',
        'sheds.name as shed_name'
      )
      .leftJoin('animal_variants', 'livestock.variant_id', 'animal_variants.id')
      .leftJoin('sheds', 'livestock.shed_id', 'sheds.id')
      .orderBy('livestock.created_at', 'desc')

    return { success: true, data: livestock }
  } catch (error) {
    console.error('Error fetching livestock:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch livestock' })
  }
})
