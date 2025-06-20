import React from 'react';
import SensorDisplay from '../components/SensorDisplay';
import ReportChart from '../components/ReportChart';
import SensorManager from '../components/SensorManager';
import Prediction from '../components/Prediction';

function ManagerPage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧑‍💼 Tableau de bord du gestionnaire</h2>

      <div className="card mb-4">
        <div className="card-body">
          <Prediction />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <SensorDisplay />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <ReportChart />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <SensorManager />
        </div>
      </div>
    </div>
  );
}

export default ManagerPage;
