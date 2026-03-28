import React from 'react';
import { Badge } from './ui/badge';

const ProductCard = ({ product, showWhatsAppButton = true }) => {
  const whatsappLink = `https://wa.me/5511994481308?text=Oi,%20vim%20pelo%20site%20da%20Julia%20Semi%20Joias%20e%20quero%20comprar%20o%20${encodeURIComponent(product.name)}`;

  const hasPromo = product.promoPrice && product.promoPrice < product.price;
  const displayPrice = hasPromo ? product.promoPrice : product.price;

  return (
    <div className="product-card-julia">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {hasPromo && (
          <Badge className="discount-badge">
            {product.discount ? `${product.discount}% OFF` : 'PROMO'}
          </Badge>
        )}
        {product.isNew && (
          <Badge className="new-badge">NOVO</Badge>
        )}
        {!product.inStock && (
          <Badge variant="destructive" className="stock-badge">ESGOTADO</Badge>
        )}
      </div>
      <div className="product-info-julia">
        <h4 className="product-name-julia">{product.name}</h4>
        <div className="product-price-container">
          <span className="current-price-julia">
            R$ {displayPrice.toFixed(2).replace('.', ',')}
          </span>
          {hasPromo && (
            <span className="original-price-julia">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        {showWhatsAppButton && product.inStock && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-product-julia"
          >
            Comprar no WhatsApp
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
