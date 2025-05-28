import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'citizen'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/register', formData);
      alert("Inscription réussie !");
    } catch (err) {
      alert("Erreur : " + err.response.data);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required /><br/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br/>
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required /><br/>
        <select name="role" onChange={handleChange}>
          <option value="citizen">Citoyen</option>
          <option value="manager">Gestionnaire</option>
          <option value="researcher">Chercheur</option>
        </select><br/>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
