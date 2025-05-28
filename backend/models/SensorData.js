const db = require('../config/db');

const SensorData = {
  insert: (data, callback) => {
    const { temperature, airQuality, noise, timestamp } = data;
    const sql = `
      INSERT INTO sensor_data (temperature, air_quality, noise_level, timestamp)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [temperature, airQuality, noise, timestamp], callback);
  },

  findBetweenDates: (start, end, callback) => {
    const sql = `
      SELECT * FROM sensor_data
      WHERE timestamp BETWEEN ? AND ?
      ORDER BY timestamp ASC
    `;
    db.query(sql, [start, end], callback);
  }
};

module.exports = SensorData;
