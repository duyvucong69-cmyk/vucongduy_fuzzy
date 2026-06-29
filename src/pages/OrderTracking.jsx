import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const OrderTracking = ({ queryParams }) => {
  const orderId = queryParams?.get('id') || '';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided.');
      return;
    }

    setLoading(true);
    apiFetch(`/api/orders?id=${orderId}`)
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load order tracker.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '100px', color: '#999', fontSize: '1.4rem' }}>Loading tracking details...</p>;
  }

  if (error || !order) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#fff', padding: '20px' }}>
        <h2>Tracking Error</h2>
        <p>{error || 'Order tracking not found.'}</p>
        <a href="#/order-history" style={{ color: '#ffb300', textDecoration: 'underline' }}>Back to History</a>
      </div>
    );
  }

  const dateStr = new Date(order.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Calculate timeline item class names based on order status
  // Statuses: 'Pending' | 'Preparing' | 'Shipping' | 'Completed' | 'Cancelled'
  const getTimelineClass = (stage) => {
    if (order.status === 'Cancelled') {
      return 'order-process'; // Normal/greyed out
    }
    
    switch (stage) {
      case 'Pending':
        if (order.status === 'Pending') return 'order-process ongoing';
        return 'order-process completed'; // Completed for Preparing, Shipping, Completed
        
      case 'Preparing':
        if (order.status === 'Pending') return 'order-process';
        if (order.status === 'Preparing') return 'order-process ongoing';
        return 'order-process completed'; // Completed for Shipping, Completed
        
      case 'Shipping':
        if (order.status === 'Pending' || order.status === 'Preparing') return 'order-process';
        if (order.status === 'Shipping') return 'order-process ongoing';
        return 'order-process completed'; // Completed for Completed
        
      case 'Completed':
        if (order.status === 'Completed') return 'order-process completed';
        return 'order-process'; // Otherwise normal/pending
        
      default:
        return 'order-process';
    }
  };

  const getTimelineIcon = (stage) => {
    const isCompleted = getTimelineClass(stage).includes('completed');
    if (isCompleted) {
      return <img className="process-icon" src="images/svg/chack.svg" alt="check" />;
    }
    
    switch (stage) {
      case 'Pending':
        return <i className="iconsax process-icon" data-icon="box-time" style={{ color: '#ffb300' }}></i>;
      case 'Preparing':
        return <i className="iconsax process-icon" data-icon="archive" style={{ color: '#ffb300' }}></i>;
      case 'Shipping':
        return <i className="iconsax process-icon" data-icon="truck-fast" style={{ color: '#ffb300' }}></i>;
      case 'Completed':
        return <i className="iconsax process-icon" data-icon="gift" style={{ color: '#aaa' }}></i>;
      default:
        return null;
    }
  };

  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10;
  const discount = 5;

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/order-history">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Order Tracker</h3>
          </div>
        </div>
      </header>

      <section style={{ marginTop: '20px' }}>
        <div className="custom-container">
          <h4 className="light-text fw-normal">{dateStr}</h4>
          <div className="order-id d-flex justify-content-between gap-2 mt-2" style={{ borderBottom: '1px solid #333', paddingBottom: '15px' }}>
            <h4 className="theme-color fw-medium" style={{ fontSize: '1.4rem', color: '#fff' }}>Order ID : {order.id}</h4>
            <h4 className="theme-color fw-semibold" style={{ fontSize: '1.4rem', color: '#fff' }}>
              <span className="light-text fw-normal" style={{ color: '#aaa' }}>Amount :</span> ${order.totalPrice.toFixed(2)}
            </h4>
          </div>

          {order.status === 'Cancelled' && (
            <div className="alert alert-danger mt-3" style={{ fontSize: '1.4rem', padding: '10px' }}>
              This order has been <strong>Cancelled</strong>.
            </div>
          )}

          <div className="order-tracking" style={{ marginTop: '25px' }}>
            <h2 className="mb-4" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Order Journey</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {/* STAGE 1: PENDING */}
              <li className={getTimelineClass('Pending')} style={{ marginBottom: '25px', position: 'relative' }}>
                <div className="d-flex gap-3 w-100">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getTimelineIcon('Pending')}
                  </span>
                  <div className="process-details">
                    <h4 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>Order Received</h4>
                    <h5 style={{ color: '#aaa', fontSize: '1.1rem', marginTop: '3px' }}>Your order has been placed successfully</h5>
                  </div>
                </div>
              </li>

              {/* STAGE 2: PREPARING */}
              <li className={getTimelineClass('Preparing')} style={{ marginBottom: '25px', position: 'relative' }}>
                <div className="d-flex gap-3 w-100">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getTimelineIcon('Preparing')}
                  </span>
                  <div className="process-details">
                    <h4 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>Preparing Package</h4>
                    <h5 style={{ color: '#aaa', fontSize: '1.1rem', marginTop: '3px' }}>Item is being processed and packaged</h5>
                  </div>
                </div>
              </li>

              {/* STAGE 3: SHIPPING */}
              <li className={getTimelineClass('Shipping')} style={{ marginBottom: '25px', position: 'relative' }}>
                <div className="d-flex gap-3 w-100">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getTimelineIcon('Shipping')}
                  </span>
                  <div className="process-details">
                    <h4 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>In Transit</h4>
                    <h5 style={{ color: '#aaa', fontSize: '1.1rem', marginTop: '3px' }}>Parcel has been shipped out for delivery</h5>
                  </div>
                </div>
              </li>

              {/* STAGE 4: COMPLETED */}
              <li className={getTimelineClass('Completed')} style={{ marginBottom: '25px', position: 'relative' }}>
                <div className="d-flex gap-3 w-100">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getTimelineIcon('Completed')}
                  </span>
                  <div className="process-details">
                    <h4 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>Delivered</h4>
                    <h5 style={{ color: '#aaa', fontSize: '1.1rem', marginTop: '3px' }}>Parcel has arrived at delivery address</h5>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bill details */}
      <section className="bill-details section-b-space" style={{ background: '#122636', padding: '20px 0', borderTop: '1px solid #222' }}>
        <div className="custom-container">
          <h4 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>Bill Details</h4>
          
          <div className="total-detail" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="d-flex justify-content-between" style={{ fontSize: '1.3rem', color: '#ccc' }}>
              <h5>Sub Total</h5>
              <h4>${subtotal.toFixed(2)}</h4>
            </div>
            <div className="d-flex justify-content-between" style={{ fontSize: '1.3rem', color: '#ccc' }}>
              <h5>Shipping Charge</h5>
              <h4>+${shipping.toFixed(2)}</h4>
            </div>
            <div className="d-flex justify-content-between" style={{ fontSize: '1.3rem', color: '#ccc' }}>
              <h5>Discount</h5>
              <h4 style={{ color: '#5cb85c' }}>-${discount.toFixed(2)}</h4>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: '1px solid #333', paddingTop: '10px', marginTop: '5px', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
              <h5>Total Paid</h5>
              <h4 style={{ color: '#ffb300' }}>${order.totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="panel-space"></section>
    </>
  );
};

export default OrderTracking;
