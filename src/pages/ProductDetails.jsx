import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const ProductDetails = ({ queryParams }) => {
  const productId = queryParams?.get('id') || '';
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState('');

  useEffect(() => {
    if (!productId) {
      setError('No product selected.');
      return;
    }

    setLoading(true);
    apiFetch(`/api/products?id=${productId}`)
      .then((data) => {
        setProduct(data);
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load product details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    setCartSuccess('');
    if (!product) return;
    
    // Save to local storage cart cache (simple simulation)
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity
    };

    const existingCartStr = localStorage.getItem('fuzzy_cart') || '[]';
    try {
      const cart = JSON.parse(existingCartStr);
      // Check if item already exists with same color and size
      const existingIdx = cart.findIndex(
        (item) => item.productId === product.id && item.color === selectedColor && item.size === selectedSize
      );

      if (existingIdx !== -1) {
        cart[existingIdx].quantity += quantity;
      } else {
        cart.push(cartItem);
      }
      localStorage.setItem('fuzzy_cart', JSON.stringify(cart));
      
      setCartSuccess('Added to cart successfully!');
      setTimeout(() => setCartSuccess(''), 2000);
    } catch (e) {
      console.error('Failed to add to cart:', e);
    }
  };

  const handleQtyChange = (type) => {
    if (type === 'add') {
      if (quantity < 10) setQuantity(prev => prev + 1);
    } else {
      if (quantity > 1) setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '100px', color: '#999', fontSize: '1.4rem' }}>Loading product details...</p>;
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#fff', padding: '20px' }}>
        <h2>Error Loading Product</h2>
        <p>{error || 'Product details not found.'}</p>
        <a href="#/shop" style={{ color: '#ffb300', textDecoration: 'underline' }}>Back to Shop</a>
      </div>
    );
  }

  return (
    <>
      <div className="top-image">
        <img className="product-header img-fluid" src="images/background/header-bg.png" alt="header-bg" />
      </div>

      <header className="product-page-header">
        <div className="header-panel">
          <a href="#/shop" className="product-back">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3 className="title">{product.name}</h3>
          <div className="d-flex gap-2">
            <a href="#/search" className="search">
              <i className="iconsax icons" data-icon="search-normal-2"></i>
            </a>

            <div className="like-btn animate inactive">
              <img className="outline-icon" src="images/svg/like.svg" alt="like" />
              <img className="fill-icon" src="images/svg/like-fill.svg" alt="like" />
            </div>
          </div>
        </div>
      </header>

      {/* Image Swiper / Carousel */}
      <section>
        <div className="product-image-slider">
          <div className="swiper product-1 ms-4">
            <div className="swiper-wrapper" style={{ display: 'flex', overflowX: 'auto', gap: '15px', paddingBottom: '10px' }}>
              {product.images.map((img, idx) => (
                <div key={idx} className="swiper-slide" style={{ minWidth: '80%', flex: '0 0 auto' }}>
                  <img className="img-fluid product-img" src={img} alt={`${product.name}-${idx}`} style={{ borderRadius: '12px', width: '100%', height: '220px', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details info */}
      <section className="pt-0" style={{ paddingBottom: '100px' }}>
        <div className="custom-container">
          {cartSuccess && (
            <div className="alert alert-success" style={{ fontSize: '1.3rem', padding: '8px', borderRadius: '5px', marginBottom: '15px' }}>
              {cartSuccess}
            </div>
          )}

          <div className="product-details">
            <div className="product-name">
              <h2 className="theme-color" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{product.name}</h2>
              {product.stock <= 5 && <h6 style={{ color: '#d9534f' }}>Only {product.stock} left in stock!</h6>}
            </div>

            <div className="ratings mt-1">
              <div className="d-flex align-items-center gap-1">
                <h4 className="theme-color fw-normal" style={{ fontSize: '1.4rem' }}>{product.rating}</h4>
                <ul className="rating-stars" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" style={{ width: '14px' }} /></li>
                </ul>
                <h4 className="reviews" style={{ fontSize: '1.2rem', color: '#999', marginLeft: '10px' }}>
                  {product.reviewsCount} Reviews
                </h4>
              </div>
            </div>

            <div className="product-price" style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffb300' }}>
                ${product.price}
              </h3>
              <div className="plus-minus" style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#122636', padding: '5px 15px', borderRadius: '20px' }}>
                <i className="iconsax sub" data-icon="minus" onClick={() => handleQtyChange('sub')} style={{ cursor: 'pointer', color: '#ffb300' }}></i>
                <span style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                <i className="iconsax add" data-icon="add" onClick={() => handleQtyChange('add')} style={{ cursor: 'pointer', color: '#ffb300' }}></i>
              </div>
            </div>

            {/* Colors */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>Select Color</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: c,
                      border: selectedColor === c ? '3px solid #ffb300' : '1px solid #444',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>Select Size</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '8px 15px',
                      borderRadius: '5px',
                      border: '1px solid #444',
                      background: selectedSize === s ? '#ffb300' : 'transparent',
                      color: selectedSize === s ? '#122636' : '#fff',
                      fontSize: '1.2rem',
                      cursor: 'pointer'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '5px' }}>Product Description</h4>
              <p style={{ fontSize: '1.3rem', color: '#ccc', lineHeight: '1.5' }}>{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Add to Cart Button Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#122636',
        boxShadow: '0 -2px 15px rgba(0,0,0,0.4)',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        boxSizing: 'border-box',
        borderTop: '1px solid #222'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.1rem', color: '#aaa' }}>Total Price</span>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffb300' }}>
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#ffb300',
            color: '#122636',
            padding: '12px 35px',
            borderRadius: '8px',
            fontWeight: 'bold',
            border: 'none',
            fontSize: '1.4rem',
            cursor: 'pointer'
          }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
