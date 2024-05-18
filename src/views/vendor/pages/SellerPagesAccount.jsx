import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importar FontAwesomeIcon
import { faUserCircle, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// import { Container, Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import '../styles/SellerAccount.css';

const SellerPagesAccount = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [token]);

  return (
    <div className="seller-account-page">
      <SellerSidebarComponent />
      <div className="seller-main-content">
        <SellerNavComponent />
        <div className="seller-content">
          <div className="seller-card">
            <div className="seller-card-header">Cuenta del Vendedor</div>
            <div className="seller-card-body">
              <div className="seller-row">
                <div className="seller-col seller-icon">
                  <FontAwesomeIcon icon={faUserCircle} size="4x" />
                </div>
                <div className="seller-col">
                  <div className="seller-list-group">
                    <div className="seller-list-group-item">
                      <strong>Nombre: </strong> {userData?.name} {userData?.lastname}
                    </div>
                    <div className="seller-list-group-item">
                      <strong>Email: </strong> {userData?.email}
                    </div>
                    <div className="seller-list-group-item">
                      <strong>Teléfono: </strong> {userData?.phone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="seller-row">
                <div className="seller-col seller-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" />
                </div>
                <div className="seller-col">
                  <div className="seller-list-group">
                    <div className="seller-list-group-item">
                      <strong>Dirección: </strong> {userData?.street}, {userData?.city}, {userData?.country}, {userData?.zip}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
}

export default SellerPagesAccount