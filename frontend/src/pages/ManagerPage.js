import React from 'react';
import SensorDisplay from '../components/SensorDisplay';
import ReportChart from '../components/ReportChart';
import SensorManager from '../components/SensorManager';
import Prediction from '../components/Prediction';

function ManagerPage() {
  return (
    <div>
      <h2>🧑‍💼 Tableau de bord du gestionnaire</h2>
      <Prediction />
      <hr />
      <SensorDisplay />
      <hr />
      <ReportChart />
      <hr />
      <SensorManager />
    </div>
  );
}

export default ManagerPage;
