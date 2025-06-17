import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const sensorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function CapteurMapFromManager({ sensors }) {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sensors.map((sensor, index) => (
        <Marker
          key={index}
          position={[parseFloat(sensor.lat), parseFloat(sensor.lng)]}
          icon={sensorIcon}
        >
          <Popup>
            <strong>{sensor.name}</strong><br />
            Température : {sensor.temperature || '--'} °C<br />
            Air : {sensor.airQuality || '--'}/100<br />
            Bruit : {sensor.noise || '--'} dB
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default CapteurMapFromManager;
