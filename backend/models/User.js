const db = require('../config/db');

const User = {
  create: (username, email, hashedPassword, role, callback) => {
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, hashedPassword, role], callback);
  },

  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  }
};

module.exports = User;
