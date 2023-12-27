const { Pool } = require('pg');

// const pool = new Pool({
//     host: 'monorail.proxy.rlwy.net',
//     user: 'postgres',
//     password: 'g-5af1-4-3*ca15g1efcFbg4g2a4CdC4',
//     database: 'railway',
//     port: 58150,
// });

const pool = new Pool({
    host: 'localhost',
    user: 'foodtography',
    password: 'password',
    database: 'foodtography',
    port: 5433,
});

module.exports = pool;
