import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    setLoading(true);
    apiFetch('/api/orders')
      .then(data => setOrders(data))
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffb300'; // Yellow/Orange
      case 'Preparing': return '#17a2b8'; // Teal
      case 'Shipping': return '#007bff'; // Blue
      case 'Completed': return '#28a745'; // Green
      case 'Cancelled': return '#dc3545'; // Red
      default: return '#999';
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchVal.toLowerCase()) ||
    o.items.some(item => item.name.toLowerCase().includes(searchVal.toLowerCase()))
  );

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/profile">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Order History</h3>
          </div>
        </div>
      </header>

      {/* Search Order bar */}
      <section>
        <div className="custom-container">
          <div className="theme-form search-head">
            <div className="form-group">
              <div className="form-input w-100" style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search by Order ID or Product Name..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  style={{ width: '100%', paddingLeft: '40px', height: '45px', borderRadius: '8px', border: '1px solid #ddd', background: 'transparent', color: '#fff' }}
                />
                <i className="iconsax search-icon" data-icon="search-normal-2" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="section-t-space">
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger" style={{ fontSize: '1.3rem', padding: '10px' }}>
              {error}
            </div>
          )}

          {loading && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>Loading order history...</p>}

          {!loading && filteredOrders.length === 0 && (
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
              <p style={{ color: '#aaa', fontSize: '1.4rem' }}>No orders found.</p>
            </div>
          )}

          <div className="row g-3">
            {filteredOrders.map((order) => {
              const dateStr = new Date(order.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: '2-digit'
              });

              // Show details for the first item as thumbnail representation
              const representativeItem = order.items[0];

              return (
                <div key={order.id} className="col-12" style={{ marginBottom: '10px' }}>
                  <div className="order-product-box" style={{ background: '#122636', padding: '15px', borderRadius: '12px' }}>
                    <div className="horizontal-product-box" style={{ display: 'flex' }}>
                      <a href={`#/order-tracking?id=${order.id}`} className="horizontal-product-img" style={{ width: '70px', marginRight: '15px' }}>
                        <img className="img-fluid img" src={representativeItem?.image || 'images/product/1.png'} alt={representativeItem?.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                      </a>
                      <div className="horizontal-product-details" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div className="d-flex align-items-center justify-content-between gap-2">
                          <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>
                            {representativeItem?.name} {order.items.length > 1 ? `+ ${order.items.length - 1} items` : ''}
                          </h4>
                          <span
                            style={{
                              fontSize: '1.1rem',
                              padding: '3px 8px',
                              borderRadius: '12px',
                              backgroundColor: getStatusColor(order.status),
                              color: '#fff',
                              fontWeight: 'bold'
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                        <h5 style={{ fontSize: '1.2rem', color: '#ccc', margin: '5px 0' }}>Order ID: {order.id}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffb300', margin: 0 }}>Total: ${order.totalPrice.toFixed(2)}</h5>
                          <a
                            href={`#/order-tracking?id=${order.id}`}
                            className="view-details"
                            style={{ fontSize: '1.2rem', color: '#ffb300', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="order-details d-block" style={{ borderTop: '1px solid #333', marginTop: '10px', paddingTop: '8px' }}>
                      <div className="d-flex align-items-center justify-content-between" style={{ fontSize: '1.1rem', color: '#aaa' }}>
                        <h5>Order Date : <span>{dateStr}</span></h5>
                        <h5>Payment : <span>{order.paymentMethod}</span></h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="panel-space"></section>
    </>
  );
};

export default OrderHistory;
