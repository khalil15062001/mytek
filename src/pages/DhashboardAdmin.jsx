import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDashboard() {
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid" >
                    <div className="container my-5">
                        <h2 className="mb-4 text-center">
                            <i className="fas fa-user-shield me-2 text-primary"></i>
                            Tableau de bord Administrateur
                        </h2>

                        <div className="row">
                            {/* Carte Utilisateurs */}
                            <div className="col-md-4 mb-4">
                                <div className="card text-white bg-primary h-100 shadow">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="fas fa-users fa-2x me-3"></i>
                                        <div>
                                            <h5 className="card-title">Utilisateurs</h5>
                                            <p className="card-text">145 utilisateurs inscrits</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carte Quiz */}
                            <div className="col-md-4 mb-4">
                                <div className="card text-white bg-success h-100 shadow">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="fas fa-file-alt fa-2x me-3"></i>
                                        <div>
                                            <h5 className="card-title">Quiz</h5>
                                            <p className="card-text">18 quiz disponibles</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carte Statistiques */}
                            <div className="col-md-4 mb-4">
                                <div className="card text-white bg-warning h-100 shadow">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="fas fa-chart-line fa-2x me-3"></i>
                                        <div>
                                            <h5 className="card-title">Statistiques</h5>
                                            <p className="card-text">Consultables par catégorie</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tableau statique */}
                        <div className="card mt-5 shadow">
                            <div className="card-header bg-secondary text-white">
                                <i className="fas fa-list me-2"></i>
                                Liste des utilisateurs
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Rôle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Ali Ben Salah</td>
                                            <td>ali@example.com</td>
                                            <td>ADMIN</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Fatma Kefi</td>
                                            <td>fatma@example.com</td>
                                            <td>USER</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Mehdi Riahi</td>
                                            <td>mehdi@example.com</td>
                                            <td>MODERATOR</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
