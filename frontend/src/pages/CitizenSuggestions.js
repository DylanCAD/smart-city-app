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
      setError('');
      setForm({ title: '', message: '' });
    } catch (err) {
      setError("Erreur lors de l'envoi");
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">💬 Suggestions citoyennes</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="title"
            className="form-control"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="message"
            className="form-control"
            placeholder="Votre message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Envoyer</button>
      </form>

      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default CitizenSuggestions;
