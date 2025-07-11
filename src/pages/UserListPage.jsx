import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Aucun token trouvé !");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:8081/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur fetch users :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-5">Chargement des utilisateurs...</p>;

  return (
    <UserList
      users={users}
      onDeleteSuccess={fetchUsers} // 🔁 pour recharger après suppression
    />
  );
}
