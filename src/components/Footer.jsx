import React from 'react';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-julia">
      <div className="footer-content">
        <p>&copy; 2024 Julia Semi Joias - Todos os direitos reservados</p>
        <div className="footer-links">
          <a 
            href="https://wa.me/5511994481308" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            WhatsApp
          </a>
          <a 
            href="https://instagram.com/juliahfeitosa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
