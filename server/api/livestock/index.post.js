import db from '~/server/lib/db.cjs'
import { defineEventHandler, readBody, createError } from 'h3'
import auth from '~/server/middleware/auth.js'

export default defineEventHandler(async (event) => {
  await auth(event)

  const body = await readBody(event)

  const requiredFields = ['tag_id', 'variant_id', 'shed_id', 'age', 'gender', 'weight', 'arrival_date']
  const missing = requiredFields.filter((field) => !body[field])

  if (missing.length) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing fields: ${missing.join(', ')}`
    })
  }

  try {
    const [id] = await db('livestock').insert({
      tag_id: body.tag_id,
      variant_id: body.variant_id,
      shed_id: body.shed_id,
      age: body.age,
      gender: body.gender,
      weight: body.weight,
      arrival_date: body.arrival_date,
      status: body.status || 'active',
      health_notes: body.health_notes || null,
      price: body.price || null,
      sold_at: body.sold_at || null
    })

    return { success: true, message: 'Livestock created', id }
  } catch (error) {
    console.error('Error creating livestock:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to create livestock' })
  }
})
