import db from '~/server/lib/db.cjs'
import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  try {
    const updated = await db('livestock').where({ id }).update({
      tag_id: body.tag_id,
      variant_id: body.variant_id,
      shed_id: body.shed_id,
      age: body.age,
      gender: body.gender,
      weight: body.weight,
      arrival_date: body.arrival_date,
      status: body.status,
      health_notes: body.health_notes,
      price: body.price,
      sold_at: body.sold_at,
      updated_at: db.fn.now()
    })

    if (!updated) {
      throw createError({ statusCode: 404, statusMessage: 'Livestock not found' })
    }

    return { success: true, message: 'Livestock updated' }
  } catch (error) {
    console.error('Error updating livestock:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to update livestock' })
  }
})
