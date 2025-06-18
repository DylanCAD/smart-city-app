const db = require('../config/db');

const SensorData = {
  insert: (data, callback) => {
    const { temperature, airQuality, noise, timestamp, zone, sensor_name } = data;
    const sql = `
      INSERT INTO sensor_data (temperature, air_quality, noise_level, timestamp, zone, sensor_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [temperature, airQuality, noise, timestamp, zone, sensor_name], callback);
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
