// db.js (or db.cjs)
const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',        // or your DB host
    user: 'root',             // your MySQL username
    password: 'toor',             // your MySQL password
    database: 'livestock_management', // your database name
    port: 3306                // default MySQL port
  },
  pool: { min: 2, max: 10 }
});

module.exports = db;
