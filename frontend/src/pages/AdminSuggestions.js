import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3001/api/suggestions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setSuggestions(res.data))
      .catch((err) => {
        console.error("Erreur récupération suggestions", err.message);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📬 Suggestions des citoyens</h2>

      {suggestions.length === 0 ? (
        <div className="alert alert-info">Aucune suggestion reçue.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Utilisateur</th>
              <th>Titre</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((sugg) => (
              <tr key={sugg.id}>
                <td>{sugg.username}</td>
                <td>{sugg.title}</td>
                <td>{sugg.message}</td>
                <td>{new Date(sugg.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminSuggestions;
