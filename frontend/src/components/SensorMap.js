import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';

// Icône personnalisée pour les capteurs
const sensorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const socket = io('http://localhost:3001');

function SensorMap() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    // Simule des positions aléatoires (latitude, longitude)
    const getRandomCoords = () => ({
      lat: 48.85 + (Math.random() * 0.02), // Paris approximatif
      lng: 2.34 + (Math.random() * 0.02)
    });

    socket.on('sensorData', (data) => {
      const coords = getRandomCoords();
      const newSensor = {
        ...data,
        lat: coords.lat,
        lng: coords.lng,
        id: Date.now()
      };
      setSensors(prev => [...prev.slice(-9), newSensor]); // Garde les 10 dernières
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h3>🗺️ Carte des capteurs (temps réel)</h3>
      <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sensors.map((sensor, index) => (
          <Marker key={sensor.id} position={[sensor.lat, sensor.lng]} icon={sensorIcon}>
            <Popup>
              <strong>Capteur</strong><br />
              Température : {sensor.temperature} °C<br />
              Air : {sensor.airQuality}/100<br />
              Bruit : {sensor.noise} dB<br />
              {new Date(sensor.timestamp).toLocaleTimeString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default SensorMap;
