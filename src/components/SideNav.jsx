import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function SideNav() {
  const [username, setUsername] = useState("Utilisateur");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub || decoded.username || "Utilisateur");
      } catch (err) {
        console.error("Erreur lors du décodage du token :", err);
      }
    }
  }, []);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ minHeight: "100vh", position: "fixed" }}>
      {/* Logo */}
      <a href="/" className="brand-link">
        <img
          src="/dist/img/mytek.jpg"
          alt="Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Mytek</span>
      </a>

      {/* Sidebar */}
      <div className="sidebar">
        {/* User Info */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">{username}</a>
          </div>
        </div>

        {/* Search */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <a href="/dashboardAdmin" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </a>
            </li>

            <li className="nav-item">
              <a href="/users" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>Utilisateurs</p>
              </a>
            </li>

            <li className="nav-item">
              <a href="/products" className="nav-link">
                <i className="nav-icon fas fa-box" />
                <p>Produits</p>
              </a>
            </li>
                        <li className="nav-item">
              <a href="/powerbi" className="nav-link">
                <i className="nav-icon fas fa-box" />
                <p>PowerBI</p>
              </a>
            </li>

            {/* Add more nav-items if needed */}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
