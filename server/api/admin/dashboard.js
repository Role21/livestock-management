    // server/api/admin/dashboard.js
    import auth from '~/server/middleware/auth'
    import db from '~/server/lib/db.cjs'
    

    export default defineEventHandler(async () => {
    await auth(event)
    const [livestock] = await db.query('SELECT COUNT(*) as total FROM livestock')
    const [sales] = await db.query('SELECT SUM(amount) as total FROM sales WHERE MONTH(created_at) = MONTH(CURDATE())')
    const [clients] = await db.query('SELECT COUNT(*) as total FROM clients WHERE active = 1')
    const [vaccinations] = await db.query('SELECT COUNT(*) as total FROM vaccinations WHERE date >= CURDATE()')

    return {
        totalLivestock: livestock[0].total || 0,
        monthlySales: sales[0].total || 0,
        activeClients: clients[0].total || 0,
        upcomingVaccinations: vaccinations[0].total || 0
    }
    })
