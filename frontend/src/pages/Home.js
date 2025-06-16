import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏙️ Smart City Monitoring</h1>
      <p style={styles.subtitle}>
        Bienvenue sur la plateforme de surveillance intelligente de la ville.<br />
        Suivez les données en temps réel, recevez des alertes, et analysez les tendances urbaines.
      </p>

      <div style={styles.roleContainer}>
        <button style={styles.roleButton} onClick={() => navigate('/citizen')}>👤 Espace Citoyen</button>
        <button style={styles.roleButton} onClick={() => navigate('/manager')}>🧑‍💼 Tableau Gestionnaire</button>
        <button style={styles.roleButton} onClick={() => navigate('/researcher')}>👨‍🔬 Outils Chercheur</button>
      </div>

      <hr style={{ margin: '30px 0' }} />

      <div style={styles.authContainer}>
        <button style={styles.authButton} onClick={() => navigate('/login')}>Se connecter 🔐</button>
        <button style={styles.authButton} onClick={() => navigate('/register')}>S'inscrire 📝</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to right, #e0f7fa, #e3f2fd)',
    minHeight: '100vh',
  },
  title: {
    fontSize: '40px',
    color: '#0d47a1',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '40px',
    color: '#333',
  },
  roleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '30px'
  },
  roleButton: {
    padding: '15px 30px',
    fontSize: '16px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s'
  },
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  authButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    color: '#1976d2',
    border: '2px solid #1976d2',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.3s'
  }
};

export default Home;
