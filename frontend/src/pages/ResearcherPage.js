import React from 'react';
import ReportChart from '../components/ReportChart';
import ExportCSV from '../components/ExportCSV';

function ResearcherPage() {
  return (
    <div>
      <h2>👨‍🔬 Données pour la recherche</h2>
      <ReportChart />
      <ExportCSV />
    </div>
  );
}

export default ResearcherPage;
