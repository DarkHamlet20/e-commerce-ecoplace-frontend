import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const SellerFooterComponent = () => {
  return (
    <footer className="bg-primary text-white py-4"> {/* Fondo azul más suave, texto blanco */}
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left mb-3 mb-md-0"> {/* Contenido izquierdo */}
            <p>© 2024 EcoPlace. Todos los derechos reservados.</p> {/* Nombre para el panel de vendedor */}
          </Col>
          <Col md={6} className="d-flex justify-content-center justify-content-md-end"> {/* Enlaces a redes sociales */}
            <a href="#facebook" className="text-white mx-2"> {/* Ícono de Facebook */}
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#twitter" className="text-white mx-2"> {/* Ícono de Twitter */}
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#instagram" className="text-white mx-2"> {/* Ícono de Instagram */}
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#linkedin" className="text-white mx-2"> {/* Ícono de LinkedIn */}
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6} className="text-center text-md-left"> {/* Enlaces informativos */}
            <a href="#about" className="text-white me-3">Acerca de nosotros</a>
            <a href="#contact" className="text-white">Contacto</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default SellerFooterComponent;
