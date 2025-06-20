import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function SensorDisplay() {
  const [allSensors, setAllSensors] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on('sensorData', (incomingData) => {
      setAllSensors((prev) => [...prev.slice(-50), incomingData]);
    });

    socket.on('alert', (alert) => {
      setAlerts((prev) => [...prev, alert]);
      setTimeout(() => {
        setAlerts((prev) => prev.slice(1));
      }, 10000);
    });

    return () => {
      socket.off('sensorData');
      socket.off('alert');
    };
  }, []);

  const filteredData = allSensors
    .filter((s) =>
      (selectedZone === '' || s.zone === selectedZone) &&
      (selectedName === '' || s.sensor_name === selectedName)
    )
    .pop(); // le plus récent

  // ⚠️ Alertes personnalisées
  useEffect(() => {
    if (!filteredData) return;
    const thresholds = JSON.parse(localStorage.getItem('userAlertThreshold') || '{}');

    if (thresholds.airQuality && filteredData.airQuality > thresholds.airQuality) {
      setAlerts((prev) => [...prev, {
        type: 'custom',
        message: `🚨 Votre alerte : qualité de l'air > ${thresholds.airQuality} (actuel : ${filteredData.airQuality})`
      }]);
    }

    if (thresholds.noise && filteredData.noise > thresholds.noise) {
      setAlerts((prev) => [...prev, {
        type: 'custom',
        message: `🔊 Votre alerte : bruit > ${thresholds.noise} (actuel : ${filteredData.noise} dB)`
      }]);
    }
  }, [filteredData]);

  const thresholds = JSON.parse(localStorage.getItem('userAlertThreshold') || '{}');

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h4 className="card-title mb-4">📡 Données Capteurs (Temps réel)</h4>

        {/* 🎛️ Sélecteurs */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Filtrer par zone :</label>
            <select className="form-select" value={selectedZone} onChange={(e) => {
              setSelectedZone(e.target.value);
              setSelectedName('');
            }}>
              <option value="">-- Toutes les zones --</option>
              {[...new Set(allSensors.map(s => s.zone))].map((zone, i) => (
                <option key={i} value={zone}>{zone}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Capteur :</label>
            <select className="form-select" value={selectedName} onChange={(e) => setSelectedName(e.target.value)}>
              <option value="">-- Tous les capteurs --</option>
              {[...new Set(
                allSensors
                  .filter(s => selectedZone === '' || s.zone === selectedZone)
                  .map(s => s.sensor_name)
              )].map((name, i) => (
                <option key={i} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Affichage des seuils personnalisés */}
        {thresholds.airQuality !== undefined && thresholds.noise !== undefined && (
          <p className="text-muted">
            🎛️ Seuils : Qualité de l'air &gt; {thresholds.airQuality}, Bruit &gt; {thresholds.noise}
          </p>
        )}

        {/* Alertes */}
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`alert ${alert.type === 'pollution' ? 'alert-danger' :
              alert.type === 'noise' ? 'alert-warning' : 'alert-info'}`}
            role="alert"
          >
            <strong>⚠️ Alerte :</strong> {alert.message}
          </div>
        ))}

        {/* Données capteur sélectionné */}
        {filteredData ? (
          <div className="row">
            {filteredData.sensor_name && filteredData.zone && (
              <div className="col-12 mb-2">
                <span className="badge bg-secondary">
                  🛰️ {filteredData.sensor_name} – 📍 {filteredData.zone}
                </span>
              </div>
            )}

            <div className="col-md-4 mb-2">
              <div className="card text-white bg-danger h-100">
                <div className="card-body">
                  <h5 className="card-title">🌡️ Température</h5>
                  <p className="card-text display-6">{filteredData.temperature} °C</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2">
              <div className="card text-white bg-primary h-100">
                <div className="card-body">
                  <h5 className="card-title">💨 Qualité de l'air</h5>
                  <p className="card-text display-6">{filteredData.airQuality} / 100</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2">
              <div className="card text-white bg-warning h-100">
                <div className="card-body">
                  <h5 className="card-title">🔊 Bruit</h5>
                  <p className="card-text display-6">{filteredData.noise} dB</p>
                </div>
              </div>
            </div>

            <div className="col-12 mt-3 text-end">
              <small className="text-muted">
                Dernière mise à jour : {new Date(filteredData.timestamp).toLocaleString()}
              </small>
            </div>
          </div>
        ) : (
          <p className="text-muted">Aucune donnée correspondant au filtre sélectionné.</p>
        )}
      </div>
    </div>
  );
}

export default SensorDisplay;
