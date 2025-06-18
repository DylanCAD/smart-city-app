import React from 'react';
import axios from 'axios';

function ExportJSON() {
  const handleExport = async () => {
    const start = prompt("Date de début (YYYY-MM-DD HH:MM:SS) ?");
    const end = prompt("Date de fin (YYYY-MM-DD HH:MM:SS) ?");

    if (!start || !end) {
      alert("Dates requises.");
      return;
    }

    try {
      const res = await axios.get('http://localhost:3001/api/sensor/export-json', {
        params: { start, end },
        responseType: 'blob'
      });

      const blob = new Blob([res.data], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `capteurs_export_${Date.now()}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'export JSON.");
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <button onClick={handleExport}>📦 Exporter données en JSON</button>
    </div>
  );
}

export default ExportJSON;
