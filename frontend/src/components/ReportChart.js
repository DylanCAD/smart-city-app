import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

      const labels = data.map(d => new Date(d.timestamp).toLocaleString());
      const temperature = data.map(d => d.temperature);
      const airQuality = data.map(d => d.air_quality);
      const noise = data.map(d => d.noise_level);

      setChartData({
        labels,
        datasets: [
          {
            label: '🌡️ Température (°C)',
            data: temperature,
            borderColor: '#e53935',
            backgroundColor: 'rgba(229, 57, 53, 0.2)',
            tension: 0.4
          },
          {
            label: '💨 Qualité de l’air',
            data: airQuality,
            borderColor: '#1e88e5',
            backgroundColor: 'rgba(30, 136, 229, 0.2)',
            tension: 0.4
          },
          {
            label: '🔊 Bruit (dB)',
            data: noise,
            borderColor: '#fbc02d',
            backgroundColor: 'rgba(251, 192, 45, 0.2)',
            tension: 0.4
          }
        ]
      });
    } catch (err) {
      alert('❌ Erreur lors du chargement des données.');
    }
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h4 className="card-title mb-3">📈 Rapport dynamique</h4>

        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label">📅 Début :</label>
            <input
              type="datetime-local"
              className="form-control"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">📅 Fin :</label>
            <input
              type="datetime-local"
              className="form-control"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-md-2 text-end">
            <button className="btn btn-primary w-100" onClick={fetchReport}>
              📊 Générer
            </button>
          </div>
        </div>

        {chartData && (
          <div className="mt-5">
            <Line data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportChart;
