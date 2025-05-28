const SensorData = require('../models/SensorData');

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
