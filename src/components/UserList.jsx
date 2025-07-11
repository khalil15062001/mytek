import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

export default function UserList({ users, onDeleteSuccess }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${username} ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`Utilisateur ${username} supprimé avec succès.`);
      onDeleteSuccess(); // Recharge les utilisateurs dans UserListPage
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression de l'utilisateur.");
    }
  };

  // Filtrer les utilisateurs
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole ? user.role === filterRole : true;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="user-list-container">

            <div className="user-list-header">
              <div className="header-content">
                <h1>
                  <i className="fas fa-users me-3"></i>
                  Gestion des utilisateurs
                </h1>
                <p className="text-muted">Liste complète des utilisateurs du système</p>
              </div>
              <Link to="/users/add" className="btn btn-add-user">
                <i className="fas fa-plus me-2"></i>Nouvel utilisateur
              </Link>
            </div>

            <div className="user-list-card">

              <div className="user-list-toolbar">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="filters">
                  <select
                    className="form-select"
                    value={filterRole}
                    onChange={e => {
                      setFilterRole(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">Tous les rôles</option>
                    <option value="ADMIN">Administrateur</option>
                    <option value="USER">Utilisateur</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="user-list-table">
                  <thead>
                    <tr>
                      <th>Utilisateur</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map(user => (
                        <tr key={user.id}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar">
                                {user.avatar ? (
                                  <img src={user.avatar} alt={user.username} />
                                ) : (
                                  <i className="fas fa-user"></i>
                                )}
                              </div>
                              <div>
                                <div className="user-name">{user.username}</div>
                                <div className="user-id">ID: {user.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role === 'ADMIN' && <i className="fas fa-crown me-2"></i>}
                              {user.role === 'USER' && <i className="fas fa-user me-2"></i>}
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <div className="actions">
                              <Link
                                to={`/users/edit/${user.id}`}
                                className="btn-action btn-edit"
                                title="Modifier"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <button
                                onClick={() => handleDelete(user.id, user.username)}
                                className="btn-action btn-delete"
                                title="Supprimer"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                              <Link
                                to={`/users/view/${user.id}`}
                                className="btn-action btn-view"
                                title="Voir détails"
                              >
                                <i className="fas fa-eye"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center' }}>
                          Aucun utilisateur trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="user-list-pagination">
                <button
                  className="pagination-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <span className="page-info">
                  Page {currentPage} sur {totalPages || 1}
                </span>

                <button
                  className="pagination-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
