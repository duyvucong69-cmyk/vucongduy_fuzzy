import { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [swipeIndex, setSwipeIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    const existing = localStorage.getItem('fuzzy_cart') || '[]';
    try {
      setCart(JSON.parse(existing));
    } catch (e) {
      setCart([]);
    }
  }, []);

  const saveCartState = (newCart) => {
    setCart(newCart);
    localStorage.setItem('fuzzy_cart', JSON.stringify(newCart));
  };

  const handleQtyChange = (idx, type) => {
    const newCart = [...cart];
    if (type === 'add') {
      if (newCart[idx].quantity < 10) {
        newCart[idx].quantity += 1;
      }
    } else {
      if (newCart[idx].quantity > 1) {
        newCart[idx].quantity -= 1;
      }
    }
    saveCartState(newCart);
  };

  const handleDelete = (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    saveCartState(newCart);
    setSwipeIndex(null);
  };

  // Touch handlers for Swipe-to-Delete
  const handleTouchStart = (idx, e) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setSwipeIndex(idx);
  };

  const handleTouchMove = (e) => {
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = currentX - startX;
    // If swiped left by more than 50px, keep it open (offset -80px)
    if (diff < -50) {
      setStartX(0);
      setCurrentX(-80);
    } else {
      // Snap back to 0
      setSwipeIndex(null);
      setStartX(0);
      setCurrentX(0);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/landing">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Cart</h3>
          </div>
        </div>
      </header>

      <section style={{ marginTop: '20px' }}>
        <div className="custom-container">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: '80px 0' }}>
              <i className="iconsax" data-icon="basket-2" style={{ fontSize: '5rem', color: '#ffb300', marginBottom: '15px' }}></i>
              <h4 style={{ color: '#ccc' }}>Your cart is empty</h4>
              <a href="#/shop" className="btn mt-3" style={{ background: '#ffb300', color: '#122636', fontWeight: 'bold' }}>
                Shop Now
              </a>
            </div>
          ) : (
            <ul className="horizontal-product-list" style={{ padding: 0, listStyle: 'none' }}>
              {cart.map((item, idx) => {
                // Calculate swipe translation
                const isCurrentSwiped = swipeIndex === idx;
                const diff = isCurrentSwiped ? currentX - startX : 0;
                // Bound the offset between -80px and 0px
                const offset = isCurrentSwiped ? Math.max(-80, Math.min(0, diff)) : 0;

                return (
                  <li
                    key={`${item.productId}-${item.color}-${item.size}`}
                    className="cart-product-box"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      marginBottom: '15px',
                      background: '#1a3245',
                      borderRadius: '12px',
                      height: '110px'
                    }}
                  >
                    {/* Delete Background Panel */}
                    <div
                      onClick={() => handleDelete(idx)}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: '80px',
                        height: '100%',
                        backgroundColor: '#d9534f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        borderRadius: '0 12px 12px 0',
                        zIndex: 1
                      }}
                    >
                      Delete
                    </div>

                    {/* Foreground Swipable Row */}
                    <div
                      onTouchStart={(e) => handleTouchStart(idx, e)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      style={{
                        transform: `translateX(${offset}px)`,
                        transition: isCurrentSwiped ? 'none' : 'transform 0.2s ease-out',
                        position: 'relative',
                        backgroundColor: '#122636',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        display: 'flex',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div className="horizontal-product-img" style={{ width: '80px', marginRight: '15px' }}>
                        <a href={`#/product-details?id=${item.productId}`}>
                          <img className="img-fluid img" src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                        </a>
                      </div>
                      <div className="horizontal-product-details" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <a href={`#/product-details?id=${item.productId}`} style={{ textDecoration: 'none' }}>
                            <h4 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>{item.name}</h4>
                          </a>
                          <i
                            className="iconsax trash"
                            data-icon="trash"
                            onClick={() => handleDelete(idx)}
                            style={{ color: '#999', cursor: 'pointer' }}
                          ></i>
                        </div>
                        <ul className="product-info" style={{ display: 'flex', gap: '15px', padding: 0, margin: '5px 0', listStyle: 'none', fontSize: '1.1rem', color: '#aaa' }}>
                          <li>Size: {item.size}</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            Color:{' '}
                            <span
                              style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: item.color,
                                border: '1px solid #555'
                              }}
                            ></span>
                          </li>
                        </ul>

                        <div className="d-flex align-items-center justify-content-between">
                          <h3 className="fw-semibold" style={{ color: '#ffb300', fontSize: '1.4rem', margin: 0 }}>
                            ${item.price}
                          </h3>
                          <div className="plus-minus" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1a3245', padding: '3px 10px', borderRadius: '15px' }}>
                            <button className="sub plus-minus-button" onClick={() => handleQtyChange(idx, 'sub')} style={{ border: 'none', background: 'none', color: '#ffb300', cursor: 'pointer' }}>
                              <i className="iconsax" data-icon="minus" style={{ fontSize: '1.2rem' }}></i>
                            </button>
                            <span style={{ fontSize: '1.2rem', color: '#fff', minWidth: '15px', textAlign: 'center' }}>{item.quantity}</span>
                            <button className="add plus-minus-button" onClick={() => handleQtyChange(idx, 'add')} style={{ border: 'none', background: 'none', color: '#ffb300', cursor: 'pointer' }}>
                              <i className="iconsax" data-icon="add" style={{ fontSize: '1.2rem' }}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {cart.length > 0 && (
        <div className="pay-popup" style={{ background: '#122636', borderTop: '1px solid #222', zIndex: 100 }}>
          <div className="price-items">
            <h6 style={{ color: '#ccc' }}>Total price</h6>
            <h2 style={{ color: '#ffb300' }}>${total.toFixed(2)}</h2>
          </div>
          <a href="#/checkout" className="btn btn-lg theme-btn pay-btn mt-0" style={{ background: '#ffb300', color: '#122636', fontWeight: 'bold' }}>
            Checkout
          </a>
        </div>
      )}

      <section className="panel-space"></section>
    </>
  );
};

export default Cart;
