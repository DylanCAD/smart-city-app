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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top px-4">
      <Link className="navbar-brand fw-bold" to="/">🏙️ SmartCity</Link>

      {/* Toggle for mobile view */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>


      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {role === 'citizen' && (
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold px-3 nav-link-custom" to="/citizen">👤 Citoyen</Link>
            </li>
          )}
          {role === 'manager' && (
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold px-3 nav-link-custom" to="/manager">🧑‍💼 Gestionnaire</Link>
            </li>
          )}
          {role === 'researcher' && (
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold px-3 nav-link-custom" to="/researcher">👨‍🔬 Chercheur</Link>
            </li>
          )}
          {role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold px-3 nav-link-custom" to="/admin">👮 Admin</Link>
            </li>
          )}
          {role === 'citizen' && (
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold px-3 nav-link-custom" to="/citizen/alerts">⚠️ Alertes personnalisées</Link>
            </li>
          )}
          {role === 'citizen' && (
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold px-3 nav-link-custom" to="/citizen/suggestions">💬 Suggestions</Link>
            </li>
          )}
          {role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold px-3 nav-link-custom" to="/admin/suggestions">📬 Suggestions</Link>
            </li>
          )}
        </ul>

        <div className="d-flex align-items-center gap-2">
          {/* {role && <span className="text-white">Connecté : <strong>{role}</strong></span>} */}
          {!role && (
            <>
              <Link className="btn btn-light btn-sm" to="/login">Se connecter</Link>
              <Link className="btn btn-outline-light btn-sm" to="/register">S'inscrire</Link>
            </>
          )}
          {role && <Link className="btn btn-outline-light btn-sm" to="/profile">Mon profil</Link>}
          {role && <button className="btn btn-danger btn-sm" onClick={handleLogout}>Déconnexion</button>}
        </div>
      </div>

      {/* Style personnalisé */}
      <style jsx="true">{`
        .nav-link-custom {
          opacity: 1 !important;
          transition: all 0.2s ease-in-out;
          border-bottom: 2px solid transparent;
        }

        .nav-link-custom:hover {
          border-bottom: 2px solid white;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
