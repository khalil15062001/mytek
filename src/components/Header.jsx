import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté
  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (e) {
      console.error("Token invalide:", e);
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link" onClick={() => navigate("/")}>
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Contact</a>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Affichage conditionnel */}
          {!user ? (
            <li className="nav-item d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </li>
          ) : (
            <li className="nav-item d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/profile")}
              >
                <i className="fas fa-user-circle me-1"></i>
                Profile
              </button>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Logout
              </button>
            </li>
          )}

          {/* Optionnel : Search, Fullscreen... */}
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i className="fas fa-th-large" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
