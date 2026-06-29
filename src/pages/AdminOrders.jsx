import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllOrders = () => {
    setLoading(true);
    // Call GET /api/orders with admin=true parameter
    apiFetch('/api/orders?admin=true')
      .then(data => setOrders(data))
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch admin orders.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiFetch('/api/orders', {
        method: 'PUT',
        body: JSON.stringify({ orderId, status: newStatus })
      });
      // Refresh
      fetchAllOrders();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update order status.');
    }
  };

  const statuses = [
    { value: 'Pending', label: 'Pending (Chờ xác nhận)' },
    { value: 'Preparing', label: 'Preparing (Đang chuẩn bị)' },
    { value: 'Shipping', label: 'Shipping (Đang giao)' },
    { value: 'Completed', label: 'Completed (Hoàn thành)' },
    { value: 'Cancelled', label: 'Cancelled (Đã hủy)' }
  ];

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/profile">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Admin Order Management</h3>
          </div>
        </div>
      </header>

      <section style={{ marginTop: '20px', paddingBottom: '80px' }}>
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger" style={{ fontSize: '1.3rem', padding: '10px' }}>
              {error}
            </div>
          )}

          {loading && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>Loading all orders...</p>}

          {!loading && orders.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>No orders found in database.</p>
          )}

          <ul style={{ padding: 0, listStyle: 'none' }}>
            {orders.map((order) => {
              const dateStr = new Date(order.createdAt).toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <li
                  key={order.id}
                  style={{
                    background: '#122636',
                    padding: '15px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid #333'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ color: '#ffb300', margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>{order.id}</h4>
                      <span style={{ fontSize: '1.1rem', color: '#aaa' }}>Placed on: {dateStr}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>${order.totalPrice.toFixed(2)}</span>
                      <span style={{ display: 'block', fontSize: '1.1rem', color: '#aaa' }}>Mode: {order.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block', marginBottom: '5px' }}>Items:</span>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '1.2rem', color: '#ccc', margin: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>• {item.name} (x{item.quantity}) - {item.size} / {item.color}</span>
                        <span style={{ color: '#fff' }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div style={{ marginBottom: '15px', background: '#1a3245', padding: '10px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block' }}>Deliver To:</span>
                    <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>{order.address.name} ({order.address.phone})</span>
                    <p style={{ fontSize: '1.2rem', color: '#ccc', margin: '3px 0 0' }}>{order.address.addressDetails}</p>
                  </div>

                  {/* Status Dropdown selector */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 'bold' }}>Update Status:</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        background: '#1a3245',
                        color: '#fff',
                        border: '1px solid #ffb300',
                        borderRadius: '5px',
                        fontSize: '1.3rem',
                        cursor: 'pointer'
                      }}
                    >
                      {statuses.map(st => (
                        <option key={st.value} value={st.value}>{st.label}</option>
                      ))}
                    </select>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default AdminOrders;
