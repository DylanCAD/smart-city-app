import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Prediction() {
  const [message, setMessage] = useState('');
  const [trend, setTrend] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/sensor/predict?limit=20');
        const data = res.data;

        if (data.length < 2) {
          setMessage("Pas assez de données pour prédire.");
          return;
        }

        const firstHalf = data.slice(0, data.length / 2);
        const secondHalf = data.slice(data.length / 2);

        const avg = arr => arr.reduce((sum, d) => sum + d.air_quality, 0) / arr.length;
        const oldAvg = avg(firstHalf);
        const newAvg = avg(secondHalf);

        if (newAvg > oldAvg + 5) setTrend('⬆️ La pollution augmente');
        else if (newAvg < oldAvg - 5) setTrend('⬇️ La pollution diminue');
        else setTrend('➖ Pollution stable');

      } catch (err) {
        setMessage("⛔ Impossible d'obtenir les données prédictives.");
        console.error("Erreur prédiction :", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ background: '#f5f5f5', padding: '20px', marginBottom: '20px' }}>
      <h3>🔮 Analyse prédictive (qualité de l'air)</h3>
      {trend ? <p><strong>{trend}</strong></p> : <p>{message}</p>}
      <small>(Basé sur les 20 dernières mesures)</small>
    </div>
  );
}

export default Prediction;
