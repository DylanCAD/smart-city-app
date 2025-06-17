import React, { useState, useEffect } from 'react';
import CapteurMapFromManager from './CapteurMapFromManager';

function SensorManager() {
  const [sensors, setSensors] = useState([]);
  const [form, setForm] = useState({
    name: '',
    type: '',
    zone: '',
    lat: '',
    lng: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.zone || !form.lat || !form.lng) {
      alert("Tous les champs sont requis.");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...sensors];
      updated[editingIndex] = form;
      setSensors(updated);
      setEditingIndex(null);
    } else {
      setSensors([...sensors, form]);
    }

    setForm({ name: '', type: '', zone: '', lat: '', lng: '' });
  };

  const handleEdit = (index) => {
    setForm(sensors[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce capteur ?");
    if (!confirmed) return;

    const updated = sensors.filter((_, i) => i !== index);
    setSensors(updated);

    if (editingIndex === index) {
      setEditingIndex(null);
      setForm({ name: '', type: '', zone: '', lat: '', lng: '' });
    }
  };

  // 🔁 Mise à jour des données simulées toutes les 5s
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedSensors = sensors.map(sensor => ({
        ...sensor,
        temperature: (Math.random() * 10 + 20).toFixed(1),
        airQuality: Math.floor(Math.random() * 100),
        noise: Math.floor(Math.random() * 80 + 20),
        timestamp: new Date().toISOString()
      }));

      setSensors(updatedSensors);
    }, 5000);

    return () => clearInterval(interval);
  }, [sensors]);

  return (
    <div>
      <h3>🔧 Gestion des capteurs</h3>
      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: '20px' }}>
        <input name="name" placeholder="Nom du capteur" value={form.name} onChange={handleChange} required />{' '}
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />{' '}
        <input name="zone" placeholder="Zone" value={form.zone} onChange={handleChange} required />{' '}
        <input name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange} required />{' '}
        <input name="lng" placeholder="Longitude" value={form.lng} onChange={handleChange} required />{' '}
        <button type="submit">{editingIndex !== null ? "Modifier" : "Ajouter"}</button>
      </form>

      {/* ✅ Carte des capteurs */}
      <CapteurMapFromManager sensors={sensors} />

      <br />

      {sensors.length === 0 ? (
        <p>Aucun capteur enregistré.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Zone</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Temp</th>
              <th>Air</th>
              <th>Bruit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, index) => (
              <tr key={index}>
                <td>{sensor.name}</td>
                <td>{sensor.type}</td>
                <td>{sensor.zone}</td>
                <td>{sensor.lat}</td>
                <td>{sensor.lng}</td>
                <td>{sensor.temperature || '--'}</td>
                <td>{sensor.airQuality || '--'}</td>
                <td>{sensor.noise || '--'}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>✏️</button>{' '}
                  <button onClick={() => handleDelete(index)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SensorManager;
