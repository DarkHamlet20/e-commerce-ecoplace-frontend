import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importar FontAwesomeIcon
import { faUserCircle, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// import { Container, Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminPagesAccount.css';

const AdminPagesAccount = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://34.201.92.59:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [token]);

  return (
    <div className="admin-account-container">
      <div className="admin-account-content">
        <AdminSidebar />
        <div className="admin-account-main">
          <AdminNavComponent />
          <div className="admin-account-details">
            <div className="admin-account-card">
              <h2 className="admin-account-title">Cuenta del Administrador</h2>
              <div className="admin-account-info">
                <div className="admin-account-section">
                  <div className="admin-account-icon">
                    <FontAwesomeIcon icon={faUserCircle} size="4x" />
                  </div>
                  <div className="admin-account-data">
                    <p><strong>Nombre:</strong> {userData?.name} {userData?.lastname}</p>
                    <p><strong>Email:</strong> {userData?.email}</p>
                    <p><strong>Teléfono:</strong> {userData?.phone}</p>
                  </div>
                </div>
                <div className="admin-account-section">
                  <div className="admin-account-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" />
                  </div>
                  <div className="admin-account-data">
                    <p><strong>Dirección:</strong> {userData?.street}, {userData?.city}, {userData?.country}, {userData?.zip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default AdminPagesAccount;
