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
    <div className="container mt-4">
      <h3 className="mb-4">🔧 Gestion des capteurs</h3>

      <form onSubmit={handleAddOrUpdate} className="row g-3">
        <div className="col-md-4">
          <input className="form-control" name="name" placeholder="Nom du capteur" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="zone" placeholder="Zone" value={form.zone} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input className="form-control" name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input className="form-control" name="lng" placeholder="Longitude" value={form.lng} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100">
            {editingIndex !== null ? "Modifier" : "Ajouter"}
          </button>
        </div>
        <div className="col-md-3">
          <button type="reset" className="btn btn-secondary w-100" onClick={() => {
            setForm({ name: '', type: '', zone: '', lat: '', lng: '' });
            setEditingIndex(null);
          }}>Annuler</button>
        </div>
      </form>

      <div className="my-4">
        <CapteurMapFromManager sensors={sensors} />
      </div>

      {sensors.length === 0 ? (
        <p className="text-muted">Aucun capteur enregistré.</p>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
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
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(index)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SensorManager;
