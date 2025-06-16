import React from 'react';
import axios from 'axios';

function ExportCSV() {
  const handleExport = async () => {
    const start = prompt("Date de début (YYYY-MM-DD HH:MM:SS) ?");
    const end = prompt("Date de fin (YYYY-MM-DD HH:MM:SS) ?");

    if (!start || !end) {
      alert("Dates requises.");
      return;
    }

    try {
      const res = await axios.get('http://localhost:3001/api/sensor/report', {
        params: { start, end }
      });

      const data = res.data;

      if (data.length === 0) {
        alert("Aucune donnée trouvée.");
        return;
      }

      // Générer le contenu CSV
      const headers = "Température,Qualité de l'air,Bruit,Date\n";
      const rows = data.map(d =>
        `${d.temperature},${d.air_quality},${d.noise_level},"${d.timestamp}"`
      ).join("\n");

      const csvContent = headers + rows;

      // Créer un blob et déclencher le téléchargement
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `capteurs_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'export.");
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button onClick={handleExport}>📄 Exporter données en CSV</button>
    </div>
  );
}

export default ExportCSV;
