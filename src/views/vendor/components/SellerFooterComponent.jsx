import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles/SellerFooter.css';

const SellerFooterComponent = () => {
  return (
    <footer className="seller-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>© 2024 EcoPlace. Todos los derechos reservados.</p>
        </div>
        <div className="footer-right">
          <a href="#facebook" className="social-link">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="#twitter" className="social-link">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="#instagram" className="social-link">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="#linkedin" className="social-link">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <a href="#about" className="footer-link">Acerca de nosotros</a>
        <a href="#contact" className="footer-link">Contacto</a>
      </div>
    </footer>
  );
}

export default SellerFooterComponent;
