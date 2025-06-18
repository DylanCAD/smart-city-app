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
  const zones = ['Centre-ville', 'Quartier Sud', 'Zone Industrielle', 'Gare', 'Parc Ouest'];
  const capteurs = ['Capteur A1', 'Capteur B2', 'Capteur C3', 'Capteur D4', 'Capteur E5'];

  const interval = setInterval(() => {
    const zoneIndex = Math.floor(Math.random() * zones.length);
    const data = {
      temperature: (Math.random() * 10 + 20).toFixed(1),  // 20 - 30°C
      airQuality: Math.floor(Math.random() * 100),       // 0 - 100
      noise: Math.floor(Math.random() * 80 + 20),         // 20 - 100 dB
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      zone: zones[zoneIndex],
      sensor_name: capteurs[zoneIndex] // 🆕 Capteur associé à la zone
    };
 // ENVOI DES DONNÉES EN TEMPS RÉEL
  socket.emit('sensorData', data);

  // SAUVEGARDE EN BASE
  SensorData.insert(data, (err) => {
    if (err) console.error("Erreur insertion :", err);
    else console.log(`✅ ${data.sensor_name} (${data.zone}) enregistrée.`);
  });

  // Alertes
  if (data.airQuality > 80) {
    socket.emit('alert', {
      type: 'pollution',
      message: `🚨 ${data.sensor_name} - Qualité de l'air très mauvaise : ${data.airQuality}/100`
    });
  }

  if (data.noise > 90) {
    socket.emit('alert', {
      type: 'noise',
      message: `🔊 ${data.sensor_name} - Bruit élevé : ${data.noise} dB`
    });
  }

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

const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const suggestionRoutes = require('./routes/suggestionRoutes');
app.use('/api/suggestions', suggestionRoutes);
