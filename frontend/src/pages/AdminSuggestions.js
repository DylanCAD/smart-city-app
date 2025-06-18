import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/suggestions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error("Erreur récupération suggestions", err.message);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div>
      <h2>📬 Suggestions des citoyens</h2>
      {suggestions.length === 0 ? (
        <p>Aucune suggestion reçue.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
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
