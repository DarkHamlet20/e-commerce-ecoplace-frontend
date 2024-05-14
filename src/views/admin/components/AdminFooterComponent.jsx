import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import '../styles/AdminFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AdminFooterComponent = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-content">
        <div className="footer-text">
          © 2024 EcoPlace. Todos los derechos reservados.
        </div>
        <div className="social-icons">
          <a href="#facebook"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
          <a href="#twitter"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
          <a href="#instagram"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
          <a href="#linkedin"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
        </div>
      </div>
    </footer>
);
}

export default AdminFooterComponent