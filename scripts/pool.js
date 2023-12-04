const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'foodtography',
    password: 'password',
    database: 'foodtography',
    port: 5433,
});

module.exports = pool;
