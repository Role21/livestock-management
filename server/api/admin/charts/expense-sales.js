    // server/api/admin/charts/expense-sales.js
    import auth from '~/server/middleware/auth'
    import db from '~/server/lib/db.cjs'
    

    export default defineEventHandler(async () => {
    await auth(event)
    const [rows] = await db.query(`
        SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        SUM(CASE WHEN type = 'sale' THEN amount ELSE 0 END) as sales,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
        FROM transactions
        GROUP BY month
        ORDER BY month
    `)

    return {
        labels: rows.map(row => row.month),
        salesData: rows.map(row => row.sales),
        expenseData: rows.map(row => row.expenses),
    }
    })
