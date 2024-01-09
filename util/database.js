const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodeproject1",
  password: "Rohith@3112",
});

module.exports = pool.promise();
