const db = require('../config/db');

const Suggestion = {
  create: (userId, title, message, callback) => {
    const sql = 'INSERT INTO suggestions (user_id, title, message) VALUES (?, ?, ?)';
    db.query(sql, [userId, title, message], callback);
  },

  getAll: (callback) => {
    const sql = `
      SELECT suggestions.*, users.username 
      FROM suggestions
      JOIN users ON users.id = suggestions.user_id
      ORDER BY suggestions.created_at DESC
    `;
    db.query(sql, callback);
  }
};

module.exports = Suggestion;
