const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "caresync",
  password: "0305",
  port: 5432,
});

module.exports = pool;