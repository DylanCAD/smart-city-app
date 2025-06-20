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
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title mb-3">🔮 Analyse prédictive de la qualité de l'air</h4>

        {trend ? (
          <div className="alert alert-info" role="alert">
            <strong>{trend}</strong>
          </div>
        ) : (
          <p className="text-muted">{message}</p>
        )}

        <small className="text-secondary">
          (Basé sur les 20 dernières mesures enregistrées)
        </small>
      </div>
    </div>
  );
}

export default Prediction;
