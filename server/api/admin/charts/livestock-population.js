    // server/api/admin/charts/livestock-population.js
    import auth from '~/server/middleware/auth'
    import db from '~/server/lib/db.cjs'
    

    export default defineEventHandler(async () => {
    await auth(event)

    const [rows] = await db.query(`
        SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month, 
        COUNT(*) as count
        FROM livestock
        GROUP BY month
        ORDER BY month
    `)

    return {
        labels: rows.map(row => row.month),
        data: rows.map(row => row.count),
    }
    })
