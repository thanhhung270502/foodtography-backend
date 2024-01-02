// import { pool } from './pool';
const pool = require('./pool');

// const createTableUsers = async () => {
//     try {
//         await pool.query('drop table if exists users cascade');

//         const query = `
//         CREATE TABLE users (
//             id              SERIAL      NOT NULL,
//             email           varchar     NOT NULL,
//             "password"      varchar     NOT NULL,
//             name            varchar     NULL,
//             avatar          varchar     NULL,
//             provider        varchar     NULL,
//             "role"          int         NULL,
//             created_at      date        NOT NULL,
//             updated_at      date        NOT NULL,
//             CONSTRAINT users_pk PRIMARY KEY (id)
//         )`;
//         await pool.query(query);
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// };

const createRecipes = async () => {
    try {
        await pool.query('drop table if exists meal cascade');
        await pool.query('drop table if exists meal_recipes cascade');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const clearAllDatabases = async () => {
    try {
        await pool.query('drop table if exists "user" cascade');
        await pool.query('drop table if exists meal cascade');
        await pool.query('drop table if exists ingredient cascade');
        await pool.query('drop table if exists meal_recipes cascade');
        await pool.query('drop table if exists recipe cascade');
        await pool.query('drop table if exists recipe_ingredients cascade');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

(async () => {
    try {
        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
        await clearAllDatabases();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
