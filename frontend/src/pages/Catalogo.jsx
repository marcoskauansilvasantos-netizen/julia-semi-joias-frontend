import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../mock/mockData';

const Catalogo = () => {
  const [activeTab, setActiveTab] = useState('all');

  const allProducts = [
    ...mockProducts.novaColecao,
    ...mockProducts.ouro10k,
    ...mockProducts.prata925
  ];

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'nova':
        return mockProducts.novaColecao;
      case 'ouro':
        return mockProducts.ouro10k;
      case 'prata':
        return mockProducts.prata925;
      default:
        return allProducts;
    }
  };

  return (
    <div className="catalogo-page">
      <Header />
      
      <section className="catalogo-hero">
        <div className="container-julia">
          <h1 className="catalogo-title">Catálogo Completo</h1>
          <p className="catalogo-subtitle">
            Explore todas as nossas peças de semi joias
          </p>
        </div>
      </section>

      <section className="catalogo-content">
        <div className="container-julia">
          <Tabs defaultValue="all" className="catalogo-tabs" onValueChange={setActiveTab}>
            <TabsList className="tabs-list-julia">
              <TabsTrigger value="all" className="tab-trigger-julia">
                Todos
              </TabsTrigger>
              <TabsTrigger value="nova" className="tab-trigger-julia">
                Nova Coleção
              </TabsTrigger>
              <TabsTrigger value="ouro" className="tab-trigger-julia">
                Ouro 10K
              </TabsTrigger>
              <TabsTrigger value="prata" className="tab-trigger-julia">
                Prata 925
              </TabsTrigger>
            </TabsList>

            <div className="tab-content-container">
              <div className="products-count">
                {getFilteredProducts().length} produtos encontrados
              </div>
              
              <div className="products-grid-julia">
                {getFilteredProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Catalogo;
