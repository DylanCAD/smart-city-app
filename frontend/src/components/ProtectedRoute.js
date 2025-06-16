import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

function ProtectedRoute({ allowedRoles, children }) {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <div style={{ padding: '20px', color: 'red' }}>
      ❌ Accès refusé : Vous n'avez pas l'autorisation pour cette page.
    </div>;
  }

  return children;
}

export default ProtectedRoute;
