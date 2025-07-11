import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function ProductManager() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [viewMode, setViewMode] = useState("all");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      calculateStats();
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/products");
      setProducts(res.data);
    } catch (error) {
      showMessage("Erreur lors de la récupération des produits", "danger");
      console.error("Erreur fetch produits:", error);
    }
  };
    const getChartData = () => {
    if (!stats) return [];
    
    // Données pour le top 5 (pie chart et bar chart)
    const top5 = stats.top20.slice(0, 5);
    
    // Données pour la tendance (line chart)
    const trendData = [
      { name: 'Bottom 20', value: stats.bottom20.reduce((sum, p) => sum + p.count, 0) },
      { name: 'Moyenne', value: stats.average },
      { name: 'Top 20', value: stats.top20.reduce((sum, p) => sum + p.count, 0) },
    ];
    
    return { top5, trendData };
  };

  const chartData = getChartData();

  const calculateStats = () => {
    if (products.length === 0) return;
    
    const sorted = [...products].sort((a, b) => b.count - a.count);
    const top20 = sorted.slice(0, 20);
    const bottom20 = sorted.slice(-20);
    const total = products.reduce((sum, p) => sum + p.count, 0);
    const average = total / products.length;
    
    setStats({
      top20,
      bottom20,
      total,
      average,
      count: products.length,
      highest: sorted[0],
      lowest: sorted[sorted.length - 1]
    });
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      showMessage("Veuillez sélectionner un fichier CSV", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8081/api/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage(res.data, "success");
      fetchProducts();
    } catch (error) {
      showMessage("Erreur lors de l'upload du fichier", "danger");
      console.error(error);
    }
  };

  const uploadFromUrl = async () => {
    if (!url) {
      showMessage("Veuillez saisir une URL", "warning");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/api/products/upload-url", { url }, {
        headers: { "Content-Type": "application/json" },
      });
      showMessage(res.data, "success");
      fetchProducts();
    } catch (error) {
      showMessage("Erreur lors de l'import depuis l'URL", "danger");
      console.error(error);
    }
  };

  const getDisplayedProducts = () => {
    if (!products.length) return [];
    
    switch(viewMode) {
      case "top20": return stats?.top20 || [];
      case "bottom20": return stats?.bottom20 || [];
      default: return products;
    }
  };

  return (
    <div className="content-wrapper" style={{ minHeight: "100vh" }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="product-manager-container">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h3 className="card-title">Gestion des produits</h3>
              </div>
              
              <div className="card-body">
                {message.text && (
                  <div className={`alert alert-${message.type} alert-dismissible fade show`}>
                    {message.text}
                    <button type="button" className="close" onClick={() => setMessage({ text: "", type: "" })}>
                      <span>&times;</span>
                    </button>
                  </div>
                )}

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="card mb-4">
                      <div className="card-header bg-light">
                        <h4 className="mb-0">Importer un fichier CSV</h4>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              accept=".csv"
                              onChange={handleFileChange}
                            />
                            <label className="custom-file-label" htmlFor="customFile">
                              {file ? file.name : "Choisir un fichier"}
                            </label>
                          </div>
                        </div>
                        <button 
                          className="btn btn-primary mt-2"
                          onClick={uploadFile}
                        >
                          <i className="fas fa-upload mr-2"></i>Uploader
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header bg-light">
                        <h4 className="mb-0">Importer depuis une URL</h4>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Saisir l'URL du fichier CSV"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                        </div>
                        <button 
                          className="btn btn-primary"
                          onClick={uploadFromUrl}
                        >
                          <i className="fas fa-link mr-2"></i>Importer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {stats && (
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header bg-light">
                          <h4 className="mb-0">Statistiques</h4>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="info-box bg-info text-white p-3 rounded mb-3">
                                <div className="info-box-content">
                                  <span className="info-box-text">Total Produits</span>
                                  <span className="info-box-number">{stats.count}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="info-box bg-success text-white p-3 rounded mb-3">
                                <div className="info-box-content">
                                  <span className="info-box-text">Total Quantité</span>
                                  <span className="info-box-number">{stats.total}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="info-box bg-warning text-white p-3 rounded mb-3">
                                <div className="info-box-content">
                                  <span className="info-box-text">Moyenne</span>
                                  <span className="info-box-number">{stats.average.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="info-box bg-danger text-white p-3 rounded mb-3">
                                <div className="info-box-content">
                                  <span className="info-box-text">Top Produit</span>
                                  <span className="info-box-number">{stats.highest?.title} ({stats.highest?.count})</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                            {stats && (
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="mb-0">Top 5 des produits (Camembert)</h4>
                    </div>
                    <div className="card-body">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData.top5}
                            dataKey="count"
                            nameKey="title"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={({ title, percent }) => `${title}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {chartData.top5.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`Quantité: ${value}`, 'Nombre']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="mb-0">Top 5 des produits (Barres)</h4>
                    </div>
                    <div className="card-body">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={chartData.top5}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="title" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" name="Quantité" fill="#8884d8">
                            {chartData.top5.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-4">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="mb-0">Comparaison des groupes</h4>
                    </div>
                    <div className="card-body">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                          data={chartData.trendData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            name="Quantité totale" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

                <div className="card">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Liste des produits ({viewMode === "top20" ? "Top 20" : viewMode === "bottom20" ? "Bottom 20" : "Tous"})</h4>
                    <div className="btn-group">
                      <button 
                        className={`btn btn-sm ${viewMode === "all" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setViewMode("all")}
                      >
                        Tous
                      </button>
                      <button 
                        className={`btn btn-sm ${viewMode === "top20" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setViewMode("top20")}
                      >
                        Top 20
                      </button>
                      <button 
                        className={`btn btn-sm ${viewMode === "bottom20" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setViewMode("bottom20")}
                      >
                        Bottom 20
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                          <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Nombre</th>
                            {stats && <th>Pourcentage</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {getDisplayedProducts().length === 0 ? (
                            <tr>
                              <td colSpan={stats ? 4 : 3} className="text-center">Aucun produit trouvé</td>
                            </tr>
                          ) : (
                            getDisplayedProducts().map((prod) => (
                              <tr key={prod.id}>
                                <td>{prod.id}</td>
                                <td>{prod.title}</td>
                                <td>
                                  <span className="badge bg-primary">{prod.count}</span>
                                </td>
                                {stats && (
                                  <td>
                                    <div className="progress">
                                      <div 
                                        className="progress-bar" 
                                        role="progressbar" 
                                        style={{ width: `${(prod.count / stats.total) * 100}%` }}
                                        aria-valuenow={prod.count}
                                        aria-valuemin="0"
                                        aria-valuemax={stats.total}
                                      >
                                        {((prod.count / stats.total) * 100).toFixed(1)}%
                                      </div>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}