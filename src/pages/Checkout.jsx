import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  // Steps: 1 = Address, 2 = Payment, 3 = Review, 4 = Success
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successOrder, setSuccessOrder] = useState(null);

  useEffect(() => {
    // 1. Load Cart
    const existingCart = localStorage.getItem('fuzzy_cart') || '[]';
    try {
      setCart(JSON.parse(existingCart));
    } catch (e) {
      setCart([]);
    }

    // 2. Load Addresses
    apiFetch('/api/user/addresses')
      .then(data => {
        setAddresses(data);
        const def = data.find(addr => addr.isDefault);
        if (def) {
          setSelectedAddress(def);
        } else if (data.length > 0) {
          setSelectedAddress(data[0]);
        }
      })
      .catch(err => console.warn('Failed to load addresses:', err));
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError('Please select a shipping address.');
      setStep(1);
      return;
    }

    setLoading(true);
    setError('');

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 10;
    const discount = 5;
    const totalPrice = subtotal + shipping - discount;

    const orderPayload = {
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity
      })),
      address: {
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        addressDetails: selectedAddress.addressDetails
      },
      paymentMethod,
      totalPrice
    };

    try {
      const data = await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload)
      });

      // Clear Cart on Success
      localStorage.setItem('fuzzy_cart', '[]');
      setCart([]);
      
      setSuccessOrder(data.order);
      setStep(4); // Go to Success Screen
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10;
  const discount = 5;
  const totalPrice = subtotal + shipping - discount;

  if (cart.length === 0 && step !== 4) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#fff', padding: '20px' }}>
        <h2>Your Cart is Empty</h2>
        <p>You cannot checkout with an empty cart.</p>
        <a href="#/shop" style={{ color: '#ffb300', textDecoration: 'underline' }}>Back to Shop</a>
      </div>
    );
  }

  // --- STEP 4: SUCCESS SCREEN ---
  if (step === 4 && successOrder) {
    return (
      <div className="custom-container" style={{ textAlign: 'center', marginTop: '80px', color: '#fff', padding: '20px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#5cb85c', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' }}>
          <span style={{ fontSize: '4rem', color: '#fff', fontWeight: 'bold' }}>✓</span>
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#fff' }}>Order Placed Successfully!</h2>
        <p style={{ color: '#aaa', fontSize: '1.4rem', marginTop: '10px' }}>
          Thank you for your purchase. Your order is now being processed.
        </p>

        <div style={{ background: '#122636', borderRadius: '10px', padding: '20px', margin: '30px 0', border: '1px solid #ffb300', textAlign: 'left' }}>
          <h4 style={{ color: '#fff', margin: '0 0 10px', fontSize: '1.4rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Order Details</h4>
          <p style={{ fontSize: '1.3rem', margin: '5px 0', color: '#ccc' }}>Order ID: <strong style={{ color: '#ffb300' }}>{successOrder.id}</strong></p>
          <p style={{ fontSize: '1.3rem', margin: '5px 0', color: '#ccc' }}>Total Amount: <strong style={{ color: '#ffb300' }}>${successOrder.totalPrice.toFixed(2)}</strong></p>
          <p style={{ fontSize: '1.3rem', margin: '5px 0', color: '#ccc' }}>Payment: {successOrder.paymentMethod}</p>
          <p style={{ fontSize: '1.3rem', margin: '5px 0', color: '#ccc' }}>Deliver to: {successOrder.address.addressDetails}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <a href="#/order-history" className="btn theme-btn" style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none' }}>
            Track Your Orders
          </a>
          <a href="#/landing" style={{ color: '#ffb300', textDecoration: 'none', fontSize: '1.4rem' }}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <button
              onClick={() => {
                if (step > 1) setStep(prev => prev - 1);
                else window.location.hash = '#/cart';
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <i className="iconsax back-btn" data-icon="arrow-left" style={{ color: '#fff' }}></i>
            </button>
            <h3>Checkout</h3>
          </div>
        </div>
      </header>

      {/* Steps Indicator Progress Bar */}
      <div className="custom-container" style={{ margin: '15px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.2rem', color: step === 1 ? '#ffb300' : '#aaa' }}>1. Delivery Address</span>
          <span style={{ fontSize: '1.2rem', color: step === 2 ? '#ffb300' : '#aaa' }}>2. Payment Mode</span>
          <span style={{ fontSize: '1.2rem', color: step === 3 ? '#ffb300' : '#aaa' }}>3. Order Review</span>
        </div>
        <div style={{ width: '100%', height: '4px', background: '#333', borderRadius: '2px', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
            background: '#ffb300',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <section style={{ paddingBottom: '100px' }}>
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger" style={{ fontSize: '1.3rem', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
              {error}
            </div>
          )}

          {/* --- STEP 1: SELECT ADDRESS --- */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '15px' }}>Select Shipping Address</h2>
              {addresses.length === 0 ? (
                <div style={{ textAlign: 'center', margin: '30px 0' }}>
                  <p style={{ color: '#aaa', fontSize: '1.3rem' }}>No addresses found. Please add a shipping address.</p>
                  <a href="#/new-address" className="btn mt-3" style={{ background: '#ffb300', color: '#122636', fontWeight: 'bold' }}>
                    Add Shipping Address
                  </a>
                </div>
              ) : (
                <ul className="address-list" style={{ listStyle: 'none', padding: 0 }}>
                  {addresses.map((addr) => (
                    <li key={addr.id} style={{ marginBottom: '15px' }}>
                      <div
                        onClick={() => setSelectedAddress(addr)}
                        className={`shipping-address ${selectedAddress?.id === addr.id ? 'active' : ''}`}
                        style={{
                          border: selectedAddress?.id === addr.id ? '1px solid #ffb300' : '1px solid #333',
                          borderRadius: '8px',
                          padding: '15px',
                          cursor: 'pointer',
                          background: '#122636'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={selectedAddress?.id === addr.id}
                            onChange={() => setSelectedAddress(addr)}
                          />
                          <label className="form-check-label" style={{ fontWeight: 'bold', fontSize: '1.3rem', marginLeft: '10px', color: '#fff' }}>
                            {addr.name}
                          </label>
                        </div>
                        <div className="address-details" style={{ marginTop: '8px', paddingLeft: '22px' }}>
                          <p style={{ fontSize: '1.2rem', color: '#ccc', margin: '0 0 5px' }}>{addr.addressDetails}</p>
                          <h5 style={{ fontSize: '1.1rem', margin: 0, color: '#aaa' }}>Phone: {addr.phone}</h5>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                <a href="#/new-address" className="btn" style={{ border: '1px solid #ffb300', color: '#ffb300', width: '100%', padding: '12px', borderRadius: '5px', textDecoration: 'none', textAlign: 'center' }}>
                  + Add New Address
                </a>
              </div>

              {selectedAddress && (
                <button
                  onClick={() => setStep(2)}
                  className="btn theme-btn w-100"
                  style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '5px', fontWeight: 'bold', marginTop: '30px' }}
                >
                  Continue to Payment
                </button>
              )}
            </div>
          )}

          {/* --- STEP 2: SELECT PAYMENT METHOD --- */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '15px' }}>Select Payment Method</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { id: 'COD', label: 'Cash on Delivery (COD)', desc: 'Pay with cash upon delivery' },
                  { id: 'Bank', label: 'Bank Transfer (Chuyển khoản)', desc: 'Pay via standard banking transfer' },
                  { id: 'Momo', label: 'MoMo Wallet', desc: 'Instant payment via MoMo App' },
                  { id: 'VNPay', label: 'VNPay', desc: 'Secure payment gateway' }
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id)}
                    style={{
                      border: paymentMethod === opt.id ? '1px solid #ffb300' : '1px solid #333',
                      borderRadius: '8px',
                      padding: '15px',
                      cursor: 'pointer',
                      background: '#122636',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id)}
                    />
                    <div>
                      <h4 style={{ color: '#fff', fontSize: '1.3rem', margin: 0, fontWeight: 'bold' }}>{opt.label}</h4>
                      <p style={{ color: '#aaa', fontSize: '1.1rem', margin: '3px 0 0' }}>{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(3)}
                className="btn theme-btn w-100"
                style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '5px', fontWeight: 'bold', marginTop: '30px' }}
              >
                Continue to Review
              </button>
            </div>
          )}

          {/* --- STEP 3: ORDER REVIEW --- */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '15px' }}>Review Your Order</h2>
              
              {/* Shipping Address Summary */}
              <div style={{ background: '#122636', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                <h4 style={{ color: '#ffb300', margin: '0 0 5px', fontSize: '1.3rem', fontWeight: 'bold' }}>Delivery Address</h4>
                <p style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{selectedAddress?.name} ({selectedAddress?.phone})</p>
                <p style={{ fontSize: '1.2rem', color: '#ccc', margin: '3px 0 0' }}>{selectedAddress?.addressDetails}</p>
              </div>

              {/* Payment Summary */}
              <div style={{ background: '#122636', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                <h4 style={{ color: '#ffb300', margin: '0 0 5px', fontSize: '1.3rem', fontWeight: 'bold' }}>Payment Mode</h4>
                <p style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{paymentMethod}</p>
              </div>

              {/* Items Summary */}
              <div style={{ background: '#122636', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                <h4 style={{ color: '#ffb300', margin: '0 0 10px', fontSize: '1.3rem', fontWeight: 'bold' }}>Order Items</h4>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  {cart.map(item => (
                    <li key={`${item.productId}-${item.color}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.2rem', color: '#ccc' }}>
                      <span>{item.name} (x{item.quantity})</span>
                      <span style={{ color: '#fff' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total calculations */}
              <div style={{ background: '#122636', borderRadius: '8px', padding: '15px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '1.2rem', color: '#ccc' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '1.2rem', color: '#ccc' }}>
                  <span>Delivery Charge</span>
                  <span>+${shipping.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '1.2rem', color: '#ccc' }}>
                  <span>Discount</span>
                  <span style={{ color: '#5cb85c' }}>-${discount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: '10px', marginTop: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                  <span>Total Amount</span>
                  <span style={{ color: '#ffb300' }}>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn theme-btn w-100"
                style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '5px', fontWeight: 'bold', fontSize: '1.4rem' }}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Checkout;
