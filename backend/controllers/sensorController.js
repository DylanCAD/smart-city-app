const SensorData = require('../models/SensorData');
const db = require('../config/db');

exports.getByDate = (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: "Start et end requis" });
  }

  SensorData.findBetweenDates(start, end, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur base de données" });
    res.json(results);
  });
};

exports.getLastReadings = (req, res) => {
  const limit = parseInt(req.query.limit || 50);
  const sql = `
    SELECT * FROM sensor_data
    ORDER BY timestamp DESC
    LIMIT ?
  `;
  db.query(sql, [limit], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur base de données" });
    res.json(results.reverse()); // du plus ancien au plus récent
  });
};

exports.exportFilteredJSON = (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: "Start et end requis" });
  }

  const sql = `
    SELECT * FROM sensor_data
    WHERE timestamp BETWEEN ? AND ?
    ORDER BY timestamp ASC
  `;

  db.query(sql, [start, end], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur base de données" });

    res.header('Content-Type', 'application/json');
    res.attachment(`capteurs_export_${Date.now()}.json`);
    res.send(JSON.stringify(results, null, 2));
  });
};

