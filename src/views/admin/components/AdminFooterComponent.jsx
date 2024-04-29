import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AdminFooterComponent = () => {
  return (
    <footer className="bg-dark text-white py-3" style={{ position: 'fixed', bottom: '0', width: '100%' }}>
    <Container>
      <Row>
        <Col className="text-center">
          © 2024 EcoPlace. Todos los derechos reservados.
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <a href="#facebook" className="text-white mx-2">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="#twitter" className="text-white mx-2">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="#instagram" className="text-white mx-2">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="#linkedin" className="text-white mx-2">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);
}

export default AdminFooterComponent