import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import SensorDisplay from './components/SensorDisplay';
import ReportChart from './components/ReportChart';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Smart City App</h1>
      <Register />
      <hr />
      <Login />
      <hr />
      <SensorDisplay />
      <hr />
      <ReportChart />
    </div>
  );
}

export default App;
