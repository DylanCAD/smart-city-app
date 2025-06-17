import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserRole } from '../utils/auth';

function ProfilePage() {
  const [userData, setUserData] = useState({ username: '', email: '', role: '' });
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3001/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUserData(res.data);
      setNewUsername(res.data.username);
    }).catch(() => {
      alert("Erreur de chargement du profil.");
    });
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3001/api/profile', {
        username: newUsername,
        password: newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Modifications enregistrées !");
      setNewPassword('');
    } catch {
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div>
      <h2>👤 Mon Profil</h2>
      <p><strong>Email :</strong> {userData.email}</p>
      <p><strong>Rôle :</strong> {getUserRole()}</p>

      <div>
        <label>Nom d’utilisateur : </label>
        <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
      </div>

      <div>
        <label>Nouveau mot de passe : </label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>

      <button onClick={handleSave}>💾 Enregistrer</button>
    </div>
  );
}

export default ProfilePage;
