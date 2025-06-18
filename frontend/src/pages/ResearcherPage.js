import React from 'react';
import ReportChart from '../components/ReportChart';
import ExportCSV from '../components/ExportCSV';
import ExportJSON from '../components/ExportJSON';

function ResearcherPage() {
  return (
    <div>
      <h2>👨‍🔬 Données pour la recherche</h2>
      <ReportChart />
      <ExportCSV />
      <ExportJSON />
    </div>
  );
}

export default ResearcherPage;
