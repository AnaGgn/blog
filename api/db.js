const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: "blog",
    password: process.env.PASSWORD,
    port: 5432,
});

module.exports = pool;