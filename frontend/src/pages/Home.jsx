import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, Star, Shield, Heart, DollarSign, Lock, MessageCircle, CheckCircle, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ProductCard from '../components/ProductCard';
import { mockProducts, testimonials, benefits, trustItems } from '../mock/mockData';

const iconMap = {
  gem: Gem,
  star: Star,
  shield: Shield,
  heart: Heart,
  'dollar-sign': DollarSign,
  lock: Lock,
  'message-circle': MessageCircle,
  'check-circle': CheckCircle,
  'refresh-cw': RefreshCw
};

const Home = () => {
  // Pegar produtos em destaque de cada categoria
  const featuredOuro = mockProducts.ouro10k.filter(p => p.featured).slice(0, 3);
  const featuredPrata = mockProducts.prata925.filter(p => p.featured).slice(0, 2);
  const featuredNova = mockProducts.novaColecao.filter(p => p.featured);

  return (
    <div className="home-julia">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-julia">
        <div className="hero-content">
          <h1 className="hero-title">
            Elegância que envolve.<br />Brilho que revela quem você é.
          </h1>
          <p className="hero-subtitle">
            Semi joias sofisticadas com preços acessíveis
          </p>
          <a
            href="https://wa.me/5511994481308?text=Oi,%20vim%20pelo%20site%20da%20Julia%20Semi%20Joias%20e%20quero%20comprar"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary-julia"
          >
            Comprar pelo WhatsApp
          </a>
          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
              alt="Elegante mulher usando semi joias"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container-julia">
          <h2 className="section-title-julia">Por que escolher Julia Semi Joias?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit) => {
              const Icon = iconMap[benefit.icon];
              return (
                <div key={benefit.id} className="benefit-card-julia">
                  <div className="benefit-icon-julia">
                    <Icon size={48} />
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nova Coleção - Destaque */}
      <section className="products-section nova-colecao-section">
        <div className="container-julia">
          <div className="category-header-nova">
            <h2 className="category-title-julia">Nova Coleção</h2>
            <span className="new-collection-badge">15% OFF</span>
          </div>
          <div className="products-grid-julia">
            {featuredNova.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Ouro 10K - Destaques */}
      <section className="products-section">
        <div className="container-julia">
          <div className="category-header-ouro">
            <h2 className="category-title-julia">Ouro 10K - Destaques</h2>
          </div>
          <div className="products-grid-julia">
            {featuredOuro.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Prata 925 - Destaques */}
      <section className="products-section prata-section">
        <div className="container-julia">
          <div className="category-header-prata">
            <h2 className="category-title-julia">Prata 925 - Destaques</h2>
          </div>
          <div className="products-grid-julia">
            {featuredPrata.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="catalog-cta-container">
            <Link to="/catalogo" className="catalog-link-button">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container-julia">
          <h2 className="section-title-julia">O que dizem nossas clientes</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container-julia">
          <h2 className="section-title-julia">Compre com Confiança</h2>
          <div className="trust-grid">
            {trustItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.id} className="trust-item">
                  <div className="trust-icon">
                    <Icon size={48} />
                  </div>
                  <h3 className="trust-title">{item.title}</h3>
                  <p className="trust-description">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="urgency-section">
        <div className="urgency-content">
          <h2 className="urgency-title">Não perca tempo!</h2>
          <ul className="urgency-list">
            <li>Peças com alta procura</li>
            <li>Catálogo atualizado até 20 de Abril</li>
            <li>Descontos por tempo limitado</li>
          </ul>
          <a
            href="https://wa.me/5511994481308?text=Oi,%20vim%20pelo%20site%20da%20Julia%20Semi%20Joias%20e%20quero%20comprar"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp-julia"
          >
            <i className="fab fa-whatsapp"></i> Falar no WhatsApp
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container-julia">
          <h2 className="final-cta-title">Escolha sua peça e fale agora pelo WhatsApp</h2>
          <a
            href="https://wa.me/5511994481308?text=Oi,%20vim%20pelo%20site%20da%20Julia%20Semi%20Joias%20e%20quero%20comprar"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp-julia"
          >
            <i className="fab fa-whatsapp"></i> Falar no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Home;
