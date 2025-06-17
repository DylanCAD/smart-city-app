import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedData, setEditedData] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3001/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data))
      .catch(() => alert("Accès refusé ou erreur serveur"));
  }, []);

  const handleEditClick = (user) => {
    setEditing(user.id);
    setEditedData({ username: user.username, role: user.role });
  };

  const handleSave = async (id) => {
    await axios.put(`http://localhost:3001/api/users/${id}`, editedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditing(null);
    window.location.reload(); // recharge la liste
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    await axios.delete(`http://localhost:3001/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2>👮‍♂️ Administration des utilisateurs</h2>
      {users.length === 0 ? <p>Aucun utilisateur trouvé.</p> : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th><th>Nom</th><th>Email</th><th>Rôle</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editing === user.id
                    ? <input value={editedData.username} onChange={(e) => setEditedData({ ...editedData, username: e.target.value })} />
                    : user.username}
                </td>
                <td>{user.email}</td>
                <td>
                  {editing === user.id
                    ? <select value={editedData.role} onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}>
                        <option value="citizen">citizen</option>
                        <option value="manager">manager</option>
                        <option value="researcher">researcher</option>
                        <option value="admin">admin</option>
                      </select>
                    : user.role}
                </td>
                <td>
                  {editing === user.id
                    ? <button onClick={() => handleSave(user.id)}>✅</button>
                    : <button onClick={() => handleEditClick(user)}>✏️</button>}
                  <button onClick={() => handleDelete(user.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
