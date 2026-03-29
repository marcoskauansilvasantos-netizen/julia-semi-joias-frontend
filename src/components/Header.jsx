import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Header = () => {
  return (
    <header className="header-julia">
      <nav className="nav-container">
        <Link to="/" className="logo-julia">
          Julia Semi Joias
        </Link>
        <div className="contact-info-header">
          <a 
            href="https://wa.me/5511994481308" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-link"
          >
            <i className="fab fa-whatsapp"></i> (11) 99448-1308
          </a>
          <a 
            href="https://instagram.com/juliahfeitosa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-link"
          >
            <Instagram size={16} /> @juliahfeitosa
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
