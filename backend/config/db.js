const mysql = require ('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dylan',
  database: 'smart_city'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connecté.');
});

module.exports = db;
