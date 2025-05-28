import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function SensorDisplay() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('sensorData', (incomingData) => {
      setData(incomingData);
    });

    return () => {
      socket.disconnect(); // proprement quand le composant se démonte
    };
  }, []);

  return (
    <div>
      <h2>Données Capteurs (Temps réel)</h2>
      {data ? (
        <div>
          <p><strong>🌡 Température :</strong> {data.temperature} °C</p>
          <p><strong>💨 Qualité de l'air :</strong> {data.airQuality} / 100</p>
          <p><strong>🔊 Niveau sonore :</strong> {data.noise} dB</p>
          <p><em>🕒 {new Date(data.timestamp).toLocaleString()}</em></p>
        </div>
      ) : (
        <p>En attente de données...</p>
      )}
    </div>
  );
}

export default SensorDisplay;
