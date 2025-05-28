import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      alert("Connexion réussie !");
    } catch (err) {
      alert("Erreur : " + err.response.data);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br/>
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required /><br/>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
