import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    role: 'USER',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis le backend
  useEffect(() => {
    axios.get(`http://localhost:8081/api/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement:', error);
        alert("Erreur lors du chargement de l'utilisateur");
        navigate('/users');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/api/users/${id}`, user)
      .then(res => {
        alert(`L'utilisateur ${res.data.username} a été mis à jour avec succès`);
        navigate('/users');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour:', error);
        alert("Erreur lors de la mise à jour de l'utilisateur");
      });
  };

  if (loading) return <div>Chargement en cours...</div>;

  return (
    <div className="user-form-container">
      <i className="fas fa-user-edit bg-icon"></i>
      <i className="fas fa-cog bg-icon"></i>
      <i className="fas fa-users bg-icon"></i>

      <div className="user-form-card">
        <div className="login-header text-center mb-4">
          <h2>
            <i className="fas fa-user-edit me-2" style={{ color: "#4a6bff" }}></i>
            Modifier l'utilisateur
          </h2>
          <p className="text-muted">Modifiez les informations de l'utilisateur</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Champ Username */}
          <div className="mb-3 form-input-icon">
            <i className="fas fa-user"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Nom d'utilisateur"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Champ Email */}
          <div className="mb-3 form-input-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Champ Rôle */}
          <div className="mb-3 form-input-icon">
            <i className="fas fa-user-tag"></i>
            <select
              className="form-control"
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>


          <div className="d-flex justify-content-between mt-4">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-arrow-left me-2"></i> Annuler
            </button>
            <button type="submit" className="btn btn-submit">
              <i className="fas fa-sync-alt me-2"></i> Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
