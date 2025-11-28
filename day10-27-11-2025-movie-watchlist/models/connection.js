const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    database: 'day10_27_11_2025_movie_watchlist',
    host: 'localhost',
    password: 'sql',
    port: 5432,
    ssl: false,
});

module.exports = pool;