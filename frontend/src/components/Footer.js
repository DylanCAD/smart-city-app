import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        🌐 Projet Smart City — M1 DI LFS &copy; {new Date().getFullYear()} | Réalisé par Dylan Cadot
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#1976d2',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
    width: '100%'
  }
};

export default Footer;
