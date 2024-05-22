import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AdminFooterComponent = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 flex justify-between items-center mt-auto">
      <div className="text-sm">
        © 2024 EcoPlace. Todos los derechos reservados.
      </div>
      <div className="space-x-4">
        <a href="#facebook" className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </a>
        <a href="#twitter" className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
        <a href="#instagram" className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a href="#linkedin" className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
      </div>
    </footer>
  );
};

export default AdminFooterComponent;
