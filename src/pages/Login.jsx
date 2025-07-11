import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8081/api/auth/login", {
      email,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);

    // ✅ Décoder le token pour extraire le rôle
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role || decodedToken.authorities?.[0]?.authority;

    console.log("Utilisateur connecté avec rôle :", role);

    alert("Connexion réussie !");

    // ✅ Redirection selon le rôle
    if (role === "ADMIN") {
      window.location.href = "/dashboardAdmin";
    } else if (role === "USER") {
      window.location.href = "/dashboarduser";
    } else {
      window.location.href = "/";
    }

  } catch (err) {
    console.error("Erreur de connexion:", err);
    setError("Email ou mot de passe incorrect");
  }
};


  return (
    <div className="login-container">
      {/* Icônes décoratives en arrière-plan */}
      <i className="fas fa-sign-in-alt bg-icon"></i>
      <i className="fas fa-key bg-icon"></i>
      <i className="fas fa-user-check bg-icon"></i>

      <div className="login-card">
        <div className="login-header">
          <h2 className="text-center mb-3">
            <i className="fas fa-door-open me-2" style={{ color: "#4a6bff" }}></i>
            Connexion
          </h2>
          <p className="text-muted text-center">
            Bienvenue ! <i className="fas fa-smile ms-1"></i>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3 input-with-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              className="form-control"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 input-with-icon">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger text-center py-1">
              {error}
            </div>
          )}

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-lg">
              <i className="fas fa-sign-in-alt me-2"></i>
              Se connecter
            </button>
          </div>

          <div className="text-center mb-3">
            <a href="#forgot-password" className="text-decoration-none">
              <i className="fas fa-question-circle me-1"></i>
              Mot de passe oublié ?
            </a>
          </div>
        </form>

        <div className="login-footer text-center mt-3">
          <p className="text-muted small">
            Vous n'avez pas de compte ?
            <a href="/signup" className="text-decoration-none ms-1">
              <i className="fas fa-user-plus me-1"></i>
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
