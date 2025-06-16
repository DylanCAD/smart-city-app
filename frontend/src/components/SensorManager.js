import React, { useState } from 'react';

function SensorManager() {
  const [sensors, setSensors] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', zone: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.zone) {
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

    setForm({ name: '', type: '', zone: '' });
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

  // Si on supprime celui qu'on était en train d'éditer
  if (editingIndex === index) {
    setEditingIndex(null);
    setForm({ name: '', type: '', zone: '' });
  }
};


  return (
    <div>
      <h3>🔧 Gestion des capteurs</h3>
      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: '20px' }}>
        <input name="name" placeholder="Nom du capteur" value={form.name} onChange={handleChange} required />{' '}
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />{' '}
        <input name="zone" placeholder="Zone" value={form.zone} onChange={handleChange} required />{' '}
        <button type="submit">{editingIndex !== null ? "Modifier" : "Ajouter"}</button>
      </form>

      {sensors.length === 0 ? (
        <p>Aucun capteur enregistré.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Zone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, index) => (
              <tr key={index}>
                <td>{sensor.name}</td>
                <td>{sensor.type}</td>
                <td>{sensor.zone}</td>
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
