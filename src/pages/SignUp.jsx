import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";

export default function SignUp() {
    const [username, setUsername] = useState(""); // ✅ nouveau champ
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("📤 Tentative d'inscription avec :");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);

  if (password !== confirmPassword) {
    console.warn("⚠️ Les mots de passe ne correspondent pas.");
    setError("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    console.log("⏳ Envoi de la requête POST vers /api/auth/register...");
    const response = await axios.post("http://localhost:8081/api/auth/register", {
      username,
      email,
      password,
    });

    console.log("✅ Réponse reçue du backend :", response);
    console.log("📩 Message du backend :", response.data.message);

    alert(response.data.message || "Inscription réussie !");
    window.location.href = "/login";
  } catch (err) {
    console.error("❌ Erreur complète lors de la requête :", err);

    if (err.response) {
      console.error("🔴 Status de l'erreur HTTP :", err.response.status);
      console.error("🔍 Contenu de la réponse d'erreur :", err.response.data);

      const errorMsg =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.data.message || "Erreur lors de l'inscription";

      console.warn("⚠️ Message d'erreur affiché à l'utilisateur :", errorMsg);
      setError(errorMsg);
    } else {
      console.error("🚫 Impossible de contacter le serveur.");
      setError("Impossible de contacter le serveur.");
    }
  }
};



    return (
        <div className="signup-container">
            <i className="fas fa-user-circle bg-icon"></i>
            <i className="fas fa-lock bg-icon"></i>
            <i className="fas fa-shield-alt bg-icon"></i>

            <div className="signup-card">
                <div className="signup-header">
                    <h2 className="text-center mb-3">
                        <i className="fas fa-user-plus me-2" style={{ color: "#4a6bff" }}></i>
                        Créer un compte
                    </h2>
                    <p className="text-muted text-center">
                        Rejoignez notre communauté <i className="fas fa-users ms-1"></i>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="mb-3 input-with-icon">
                        <i className="fas fa-user"></i>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

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

                    <div className="mb-3 input-with-icon">
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

                    <div className="mb-4 input-with-icon">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            <i className="fas fa-user-plus me-2"></i>
                            S'inscrire
                        </button>
                    </div>

                    <div className="terms-text text-center small text-muted">
                        En vous inscrivant, vous acceptez nos{" "}
                        <a href="#terms" className="text-decoration-none">
                            Conditions d'utilisation
                        </a>{" "}
                        et notre{" "}
                        <a href="#privacy" className="text-decoration-none">
                            Politique de confidentialité
                        </a>
                        .
                    </div>
                </form>

                <div className="signup-footer text-center mt-4">
                    <p className="text-muted">
                        Déjà un compte ?{" "}
                        <a href="/login" className="text-decoration-none">
                            Se connecter
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
