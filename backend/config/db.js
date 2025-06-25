const mysql = require ('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Dylan',
  database: 'smart_city',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
