import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForms.css';
import axios from 'axios';

export default function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',  // Valeur par défaut user
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({}); // Reset erreurs

    if (user.password !== user.confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas." });
      return;
    }

    // Prépare payload sans avatar (champ non utilisé ici)
    const userToSend = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8081/api/users", userToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert(`Utilisateur ${response.data.username} ajouté avec succès !`);
      navigate("/users");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      if (error.response && error.response.data) {
        // Ici, adapte selon le format des erreurs backend
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          alert(`Erreur: ${error.response.data.message}`);
        } else {
          alert("Erreur lors de l'ajout de l'utilisateur.");
        }
      } else {
        alert("Erreur lors de l'ajout de l'utilisateur.");
      }
    }
  };

  return (
    <div className="user-form-container">
      <i className="fas fa-user-plus bg-icon"></i>
      <i className="fas fa-key bg-icon"></i>
      <i className="fas fa-users bg-icon"></i>

      <div className="user-form-card">
        <div className="login-header text-center mb-4">
          <h2>
            <i className="fas fa-user-plus me-2" style={{ color: "#4a6bff" }}></i>
            Ajouter un utilisateur
          </h2>
          <p className="text-muted">Remplissez les informations du nouvel utilisateur</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3 form-input-icon">
            <i className="fas fa-user"></i>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="john_doe"
              required
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          {/* Email */}
          <div className="mb-3 form-input-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3 form-input-icon position-relative">
            <i className="fas fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button 
              type="button" 
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm password */}
          <div className="mb-3 form-input-icon">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmez le mot de passe"
              required
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          {/* Role - uniquement user et admin */}
          <div className="mb-3 form-input-icon">
            <i className="fas fa-user-tag"></i>
            <select
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-submit">
              <i className="fas fa-save me-2"></i> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
