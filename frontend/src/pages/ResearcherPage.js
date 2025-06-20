import React from 'react';
import ReportChart from '../components/ReportChart';
import ExportCSV from '../components/ExportCSV';
import ExportJSON from '../components/ExportJSON';

function ResearcherPage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">👨‍🔬 Données pour la recherche</h2>

      <div className="card mb-4">
        <div className="card-body">
          <ReportChart />
        </div>
      </div>

      <div className="d-flex gap-3 justify-content-start align-items-center">
        <ExportCSV />
        <ExportJSON />
      </div>
    </div>
  );
}

export default ResearcherPage;
