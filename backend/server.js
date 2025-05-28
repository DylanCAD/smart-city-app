const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const SensorData = require('./models/SensorData');

const app = express();
const http = require('http').createServer(app); // serveur HTTP
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000", // autoriser le front
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);

// SOCKET.IO — écouter les connexions
io.on('connection', (socket) => {
  console.log('🟢 Client connecté au WebSocket');

  // envoyer les données simulées toutes les 5s
  const interval = setInterval(() => {
    const data = {
      temperature: (Math.random() * 10 + 20).toFixed(1),  // 20 - 30°C
      airQuality: Math.floor(Math.random() * 100),       // 0 - 100
      noise: Math.floor(Math.random() * 80 + 20),         // 20 - 100 dB
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    // envoyer en temps réel
  socket.emit('sensorData', data);

  // enregistrer en base
  SensorData.insert(data, (err, result) => {
    if (err) console.error("Erreur sauvegarde capteur :", err);
    else console.log("✅ Donnée capteur enregistrée.");
  });
}, 5000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('🔴 Client déconnecté du WebSocket');
  });
});

// ROUTES capteurs (après avoir défini app)
const sensorRoutes = require('./routes/sensorRoutes');
app.use('/api/sensor', sensorRoutes);

// Démarrer le serveur
http.listen(PORT, () => {
  console.log(`Serveur + WebSocket sur http://localhost:${PORT}`);
});
