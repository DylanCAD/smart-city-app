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
    })
      .then(res => setUsers(res.data))
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
    <div className="container mt-5">
      <h2 className="mb-4">👮‍♂️ Administration des utilisateurs</h2>

      {users.length === 0 ? (
        <div className="alert alert-info">Aucun utilisateur trouvé.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {editing === user.id ? (
                      <input
                        className="form-control"
                        value={editedData.username}
                        onChange={(e) =>
                          setEditedData({ ...editedData, username: e.target.value })
                        }
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {editing === user.id ? (
                      <select
                        className="form-select"
                        value={editedData.role}
                        onChange={(e) =>
                          setEditedData({ ...editedData, role: e.target.value })
                        }
                      >
                        <option value="citizen">citizen</option>
                        <option value="manager">manager</option>
                        <option value="researcher">researcher</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {editing === user.id ? (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSave(user.id)}
                      >
                        ✅
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEditClick(user)}
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
