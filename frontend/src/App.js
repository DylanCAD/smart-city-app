import React from 'react';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import SensorDisplay from './components/SensorDisplay';
import ReportChart from './components/ReportChart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CitizenPage from './pages/CitizenPage';
import ManagerPage from './pages/ManagerPage';
import ResearcherPage from './pages/ResearcherPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserRole } from './utils/auth';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* persistante sur toutes les pages */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/citizen" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <CitizenPage />
              </ProtectedRoute>
            } />
            <Route path="/manager" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerPage />
              </ProtectedRoute>
            } />
            <Route path="/researcher" element={
              <ProtectedRoute allowedRoles={['researcher']}>
                <ResearcherPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['citizen', 'manager', 'researcher']}>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
