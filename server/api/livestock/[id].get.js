import db from '~/server/lib/db.cjs'
import { defineEventHandler, getRouterParam, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const id = getRouterParam(event, 'id')

  try {
    const livestock = await db('livestock')
      .where('livestock.id', id)
      .leftJoin('animal_variants', 'livestock.variant_id', 'animal_variants.id')
      .leftJoin('sheds', 'livestock.shed_id', 'sheds.id')
      .select(
        'livestock.*',
        'animal_variants.name as variant_name',
        'sheds.name as shed_name'
      )
      .first()

    if (!livestock) {
      throw createError({ statusCode: 404, statusMessage: 'Livestock not found' })
    }

    return { success: true, data: livestock }
  } catch (error) {
    console.error('Error fetching livestock:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch livestock' })
  }
})
