import React from 'react';
import SensorDisplay from '../components/SensorDisplay';
import ReportChart from '../components/ReportChart';

function ManagerPage() {
  return (
    <div>
      <h2>🧑‍💼 Tableau de bord du gestionnaire</h2>
      <SensorDisplay />
      <hr />
      <ReportChart />
      {/* On ajoutera la gestion des capteurs plus tard */}
    </div>
  );
}

export default ManagerPage;
