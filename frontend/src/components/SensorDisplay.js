import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// ✅ La connexion WebSocket doit être en dehors du composant
const socket = io('http://localhost:3001');

function SensorDisplay() {
  const [data, setData] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    console.log("📡 Écoute des événements WebSocket...");

    socket.on('sensorData', (incomingData) => {
      console.log("📊 Donnée reçue :", incomingData);
      setData(incomingData);
    });

    socket.on('alert', (alert) => {
      console.log("⚠️ Alerte reçue :", alert);
      setAlerts(prev => [...prev, alert]);

      // supprimer l'alerte après 10 secondes
      setTimeout(() => {
        setAlerts(prev => prev.slice(1));
      }, 10000);
    });

    return () => {
      socket.off('sensorData');
      socket.off('alert');
    };
  }, []);

  return (
    <div>
      <h2>Données Capteurs (Temps réel)</h2>

      {alerts.map((alert, index) => (
        <div key={index} style={{
          backgroundColor: alert.type === 'pollution' ? '#ffcccc' : '#ffffcc',
          border: '1px solid #999',
          padding: '10px',
          marginBottom: '10px'
        }}>
          <strong>⚠️ Alerte :</strong> {alert.message}
        </div>
      ))}

      {data ? (
        <div>
          {data.sensor_name && data.zone && (
            <p><strong>🛰️ {data.sensor_name}</strong> – 📍 {data.zone}</p>
          )}
          <p><strong>Température :</strong> {data.temperature} °C</p>
          <p><strong>Qualité de l'air :</strong> {data.airQuality} / 100</p>
          <p><strong>Niveau sonore :</strong> {data.noise} dB</p>
          <p><em>{new Date(data.timestamp).toLocaleString()}</em></p>
        </div>
      ) : (
        <p>En attente de données...</p>
      )}
    </div>
  );
}

export default SensorDisplay;
