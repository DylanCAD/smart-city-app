import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>🏙️ SmartCity</Link>
      </div>

      <div style={styles.center}>
        {role === 'citizen' && <Link to="/citizen" style={styles.link}>Citoyen</Link>}
        {role === 'manager' && <Link to="/manager" style={styles.link}>Gestionnaire</Link>}
        {role === 'researcher' && <Link to="/researcher" style={styles.link}>Chercheur</Link>}
      </div>

      <div style={styles.right}>
        {role && <span style={styles.role}>Connecté : <strong>{role}</strong></span>}
        {role && <button onClick={handleLogout} style={styles.button}>Déconnexion</button>}
        {!role && <>
          <Link to="/login" style={styles.link}>Se connecter</Link>
          <Link to="/register" style={styles.link}>S'inscrire</Link>
        </>}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#1976d2',
    color: 'white',
    padding: '10px 30px',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  left: {},
  center: {
    display: 'flex',
    gap: '20px'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logo: {
    fontSize: '20px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  role: {
    fontSize: '14px'
  },
  button: {
    backgroundColor: '#ffffff',
    color: '#1976d2',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Navbar;
