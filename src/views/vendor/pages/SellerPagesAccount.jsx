import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importar FontAwesomeIcon
import { faUserCircle, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Container, Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

const SellerPagesAccount = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://54.204.138.33:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [token]);

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar */}
    <div className="d-flex min-vh-100"> {/* Estructura principal */}
      <SellerSidebarComponent /> {/* Sidebar */}
      <div className="flex-grow-1"> {/* Contenedor principal */}
        <SellerNavComponent /> {/* Navbar */}
        <Container className="mt-4"> {/* Espacio para el contenido */}
          <Card className="p-4 shadow"> {/* Tarjeta para detalles del usuario */}
            <Card.Header className="text-center text-dark h2">Cuenta del Vendedor</Card.Header>
            <Card.Body>
              <Row className="mb-3"> {/* Información personal */}
                <Col md={3} className="text-center"> {/* Ícono para indicar usuario */}
                  <FontAwesomeIcon icon={faUserCircle} size="4x" />
                </Col>
                <Col md={9}> {/* Información del usuario */}
                  <ListGroup variant="flush"> {/* Lista para detalles del usuario */}
                    <ListGroupItem>
                      <strong>Nombre: </strong> {userData?.name} {userData?.lastname}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Email: </strong> {userData?.email}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Teléfono: </strong> {userData?.phone}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
              <Row> {/* Detalles de dirección */}
                <Col md={3} className="text-center"> {/* Ícono para indicar ubicación */}
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" />
                </Col>
                <Col md={9}>
                  <ListGroup variant="flush"> {/* Lista para detalles de dirección */}
                    <ListGroupItem>
                      <strong>Dirección: </strong> {userData?.street}, {userData?.city}, {userData?.country}, {userData?.zip}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
    <SellerFooterComponent />
  </div>
);
}

export default SellerPagesAccount