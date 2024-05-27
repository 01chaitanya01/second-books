const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "1020",
    database: "xbooks"
});

module.exports = pool;