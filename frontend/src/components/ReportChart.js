import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ReportChart() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState(null);

  const fetchReport = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/sensor/report', {
        params: { start: startDate, end: endDate }
      });

      const data = res.data;

      const labels = data.map(d => new Date(d.timestamp).toLocaleTimeString());
      const temperature = data.map(d => d.temperature);
      const airQuality = data.map(d => d.air_quality);
      const noise = data.map(d => d.noise_level);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Température (°C)',
            data: temperature,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4,
          },
          {
            label: 'Qualité de l\'air',
            data: airQuality,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4,
          },
          {
            label: 'Bruit (dB)',
            data: noise,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            tension: 0.4,
          }
        ]
      });

    } catch (err) {
      alert("Erreur lors du chargement des données.");
    }
  };

  return (
    <div>
      <h2>Générer un rapport dynamique</h2>
      <label>Début :</label>
      <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <label>Fin :</label>
      <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={fetchReport}>Générer</button>

      {chartData && (
        <div style={{ maxWidth: '800px', marginTop: '30px' }}>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}

export default ReportChart;
