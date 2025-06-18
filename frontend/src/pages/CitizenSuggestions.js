import React, { useState } from 'react';
import axios from 'axios';

function CitizenSuggestions() {
  const [form, setForm] = useState({ title: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/suggestions', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Merci pour votre suggestion !');
      setForm({ title: '', message: '' });
    } catch (err) {
      setError("Erreur lors de l'envoi");
    }
  };

  return (
    <div>
      <h2>💬 Suggestions citoyennes</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="message"
          placeholder="Votre message"
          rows="4"
          cols="50"
          value={form.message}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Envoyer</button>
      </form>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CitizenSuggestions;
