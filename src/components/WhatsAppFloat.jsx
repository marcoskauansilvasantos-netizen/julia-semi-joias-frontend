import React, { useState, useEffect } from 'react';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/5511994481308?text=Oi,%20vim%20pelo%20site%20da%20Julia%20Semi%20Joias%20e%20quero%20comprar"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float ${isVisible ? 'visible' : ''}`}
      aria-label="Falar no WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppFloat;
