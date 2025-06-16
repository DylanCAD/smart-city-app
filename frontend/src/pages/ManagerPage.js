import React from 'react';
import SensorDisplay from '../components/SensorDisplay';
import ReportChart from '../components/ReportChart';
import SensorManager from '../components/SensorManager';

function ManagerPage() {
  return (
    <div>
      <h2>🧑‍💼 Tableau de bord du gestionnaire</h2>
      <SensorDisplay />
      <hr />
      <ReportChart />
      <hr />
      <SensorManager />
    </div>
  );
}

export default ManagerPage;
