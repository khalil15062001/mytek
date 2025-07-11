import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import Home from "./components/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import DashboardAdmin from "./pages/DhashboardAdmin";
import DashboardUser from "./pages/dashboardUser";
import UserListPage from "./pages/UserListPage";
import ProductManager from "./pages/ProductManager";
// Mock data
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'ADMIN', password: 'secret' },
  { id: 2, username: 'user1', email: 'user1@example.com', role: 'USER', password: 'password123' }
];

function MainLayout() {
  const location = useLocation();
  const hideSideNav = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="app">
      <Header />
      {!hideSideNav && <SideNav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/dashboardUser" element={<DashboardUser />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/products" element={<ProductManager />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}