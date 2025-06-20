import React, { useState } from 'react';

function CitizenAlerts() {
  const [threshold, setThreshold] = useState(() => {
    const saved = localStorage.getItem('userAlertThreshold');
    return saved ? JSON.parse(saved) : {
      airQuality: 80,
      noise: 90
    };
  });

  const handleChange = (e) => {
    setThreshold({ ...threshold, [e.target.name]: Number(e.target.value) });
  };

  const handleSave = () => {
    localStorage.setItem('userAlertThreshold', JSON.stringify(threshold));
    alert('Seuils enregistrés ✅');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">⚠️ Mes alertes personnalisées</h2>

      <div className="mb-3">
        <label className="form-label">Seuil qualité de l'air (0–100)</label>
        <input
          type="number"
          name="airQuality"
          className="form-control"
          value={threshold.airQuality}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Seuil de bruit (dB)</label>
        <input
          type="number"
          name="noise"
          className="form-control"
          value={threshold.noise}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSave} className="btn btn-primary">💾 Enregistrer</button>
    </div>
  );
}

export default CitizenAlerts;
