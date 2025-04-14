import auth from '~/server/middleware/auth'
import db from '~/server/lib/db.cjs'


    export default defineEventHandler(async (event) => {
    await auth(event)

    const [rows] = await db.query(`
        SELECT 
        product_name,
        SUM(amount) as revenue
        FROM sales
        GROUP BY product_name
        ORDER BY revenue DESC
        LIMIT 5
    `)

    return {
        labels: rows.map(row => row.product_name),
        data: rows.map(row => row.revenue),
    }
    })
