import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'customers'
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  // Customers State
  const [customers, setCustomers] = useState([]);
  const [custLoading, setCustLoading] = useState(false);
  const [custError, setCustError] = useState('');

  // Add/Edit Customer Form State
  const [isEditing, setIsEditing] = useState(false); // false = Add, true = Edit
  const [showCustForm, setShowCustForm] = useState(false);
  
  const [custId, setCustId] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [custFullName, setCustFullName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custBirthday, setCustBirthday] = useState('');
  const [custAvatar, setCustAvatar] = useState('images/icons/profile1.png');

  // --- API CALLS FOR ORDERS ---
  const fetchAllOrders = () => {
    setOrdersLoading(true);
    setOrdersError('');
    apiFetch('/api/orders?admin=true')
      .then(data => setOrders(data))
      .catch(err => setOrdersError(err instanceof Error ? err.message : 'Failed to fetch admin orders.'))
      .finally(() => setOrdersLoading(false));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiFetch('/api/orders', {
        method: 'PUT',
        body: JSON.stringify({ orderId, status: newStatus })
      });
      fetchAllOrders();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update order status.');
    }
  };

  // --- API CALLS FOR CUSTOMERS ---
  const fetchAllCustomers = () => {
    setCustLoading(true);
    setCustError('');
    apiFetch('/api/admin/users')
      .then(data => setCustomers(data))
      .catch(err => setCustError(err instanceof Error ? err.message : 'Failed to fetch customer directory.'))
      .finally(() => setCustLoading(false));
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    setCustError('');

    if (!custFullName.trim() || !custEmail.trim()) {
      setCustError('Full Name and Email are required.');
      return;
    }

    if (!isEditing && !custPassword) {
      setCustError('Password is required for new accounts.');
      return;
    }

    const payload = {
      id: custId,
      fullName: custFullName,
      email: custEmail,
      phone: custPhone,
      birthday: custBirthday,
      avatar: custAvatar,
    };

    if (custPassword) {
      payload.password = custPassword;
    }

    try {
      if (isEditing) {
        // Edit Customer
        await apiFetch('/api/admin/users', {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        // Add Customer
        await apiFetch('/api/admin/users', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      // Reset form & Refresh list
      resetCustomerForm();
      fetchAllCustomers();
    } catch (err) {
      setCustError(err instanceof Error ? err.message : 'Failed to save customer account.');
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer account?')) return;
    setCustError('');
    try {
      await apiFetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE'
      });
      fetchAllCustomers();
    } catch (err) {
      setCustError(err instanceof Error ? err.message : 'Failed to delete customer.');
    }
  };

  const openAddCustomer = () => {
    setIsEditing(false);
    resetCustomerForm();
    setShowCustForm(true);
  };

  const openEditCustomer = (cust) => {
    setIsEditing(true);
    setCustId(cust.id);
    setCustEmail(cust.email);
    setCustPassword(''); // Don't pre-fill password
    setCustFullName(cust.fullName || '');
    setCustPhone(cust.phone || '');
    setCustBirthday(cust.birthday || '');
    setCustAvatar(cust.avatar || 'images/icons/profile1.png');
    setShowCustForm(true);
    setCustError('');
  };

  const resetCustomerForm = () => {
    setCustId('');
    setCustEmail('');
    setCustPassword('');
    setCustFullName('');
    setCustPhone('');
    setCustBirthday('');
    setCustAvatar('images/icons/profile1.png');
    setShowCustForm(false);
    setCustError('');
  };

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchAllOrders();
    } else {
      fetchAllCustomers();
    }
  }, [activeTab]);

  const orderStatuses = [
    { value: 'Pending', label: 'Pending (Chờ xác nhận)' },
    { value: 'Preparing', label: 'Preparing (Đang chuẩn bị)' },
    { value: 'Shipping', label: 'Shipping (Đang giao)' },
    { value: 'Completed', label: 'Completed (Hoàn thành)' },
    { value: 'Cancelled', label: 'Cancelled (Đã hủy)' }
  ];

  const avatarOptions = [
    'images/icons/profile1.png',
    'images/icons/profile2.png',
    'images/icons/profile3.png',
  ];

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/profile">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Admin Panel Dashboard</h3>
          </div>
        </div>
      </header>

      {/* Tabs Navigation Toggle Bar */}
      <div className="custom-container" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: activeTab === 'orders' ? '1px solid #ffb300' : '1px solid #333',
            background: activeTab === 'orders' ? '#ffb300' : '#122636',
            color: activeTab === 'orders' ? '#122636' : '#fff',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            cursor: 'pointer'
          }}
        >
          Orders Manager
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: activeTab === 'customers' ? '1px solid #ffb300' : '1px solid #333',
            background: activeTab === 'customers' ? '#ffb300' : '#122636',
            color: activeTab === 'customers' ? '#122636' : '#fff',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            cursor: 'pointer'
          }}
        >
          Customers CRUD
        </button>
      </div>

      <section style={{ marginTop: '20px', paddingBottom: '80px' }}>
        <div className="custom-container">
          
          {/* ============================================================== */}
          {/* TAB 1: ORDER MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'orders' && (
            <div>
              {ordersError && <div className="alert alert-danger" style={{ fontSize: '1.3rem', padding: '10px' }}>{ordersError}</div>}
              {ordersLoading && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>Loading all orders...</p>}
              {!ordersLoading && orders.length === 0 && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>No orders found in database.</p>}

              <ul style={{ padding: 0, listStyle: 'none' }}>
                {orders.map((order) => {
                  const dateStr = new Date(order.createdAt).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <li key={order.id} style={{ background: '#122636', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #333' }}>
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

                      <div style={{ marginBottom: '12px' }}>
                        <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block', marginBottom: '5px' }}>Items:</span>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ fontSize: '1.2rem', color: '#ccc', margin: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>• {item.name} (x{item.quantity}) - {item.size} / {item.color}</span>
                            <span style={{ color: '#fff' }}>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom: '15px', background: '#1a3245', padding: '10px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block' }}>Deliver To:</span>
                        <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>{order.address.name} ({order.address.phone})</span>
                        <p style={{ fontSize: '1.2rem', color: '#ccc', margin: '3px 0 0' }}>{order.address.addressDetails}</p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 'bold' }}>Update Status:</label>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{ padding: '8px 12px', background: '#1a3245', color: '#fff', border: '1px solid #ffb300', borderRadius: '5px', fontSize: '1.3rem', cursor: 'pointer' }}
                        >
                          {orderStatuses.map(st => (
                            <option key={st.value} value={st.value}>{st.label}</option>
                          ))}
                        </select>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: CUSTOMER MANAGEMENT CRUD */}
          {/* ============================================================== */}
          {activeTab === 'customers' && (
            <div>
              {custError && <div className="alert alert-danger" style={{ fontSize: '1.3rem', padding: '10px', marginBottom: '15px' }}>{custError}</div>}

              {/* Add Customer Button */}
              {!showCustForm && (
                <button
                  onClick={openAddCustomer}
                  className="btn theme-btn w-100"
                  style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '25px', border: 'none' }}
                >
                  + Add New Customer
                </button>
              )}

              {/* Add/Edit Customer Form Panel */}
              {showCustForm && (
                <div style={{ background: '#122636', border: '1px solid #ffb300', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', marginBottom: '20px' }}>
                    {isEditing ? 'Edit Customer Details' : 'Create New Customer'}
                  </h3>

                  <form onSubmit={handleSaveCustomer}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Full Name *</label>
                      <input
                        type="text"
                        value={custFullName}
                        onChange={(e) => setCustFullName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                      />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Email Address *</label>
                      <input
                        type="email"
                        value={custEmail}
                        onChange={(e) => setCustEmail(e.target.value)}
                        required
                        disabled={isEditing}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: isEditing ? '#333' : '#1a3245', color: '#fff', fontSize: '1.3rem', cursor: isEditing ? 'not-allowed' : 'text' }}
                      />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>
                        Password {isEditing ? '(Leave blank to keep same)' : '*'}
                      </label>
                      <input
                        type="password"
                        value={custPassword}
                        onChange={(e) => setCustPassword(e.target.value)}
                        required={!isEditing}
                        placeholder={isEditing ? 'Enter new password' : 'Enter account password'}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                      />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Phone Number</label>
                      <input
                        type="text"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                      />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Birthday</label>
                      <input
                        type="date"
                        value={custBirthday}
                        onChange={(e) => setCustBirthday(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                      />
                    </div>

                    {/* Avatar Selection */}
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '8px' }}>Select Avatar Image</label>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <img src={custAvatar} alt="selected" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #ffb300' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          {avatarOptions.map(opt => (
                            <img
                              key={opt}
                              src={opt}
                              alt="choice"
                              onClick={() => setCustAvatar(opt)}
                              style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: custAvatar === opt ? '2px solid #ffb300' : '2px solid transparent' }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button
                        type="button"
                        onClick={resetCustomerForm}
                        className="btn w-50"
                        style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '5px', border: 'none', fontSize: '1.3rem' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn w-50"
                        style={{ background: '#ffb300', color: '#122636', padding: '10px', borderRadius: '5px', border: 'none', fontWeight: 'bold', fontSize: '1.3rem' }}
                      >
                        {isEditing ? 'Save Changes' : 'Create User'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Customers Directory List */}
              {custLoading && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>Loading customer list...</p>}
              {!custLoading && customers.length === 0 && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>No customers found.</p>}

              <ul style={{ padding: 0, listStyle: 'none' }}>
                {customers.map((cust) => (
                  <li
                    key={cust.id}
                    style={{
                      background: '#122636',
                      padding: '15px',
                      borderRadius: '12px',
                      marginBottom: '15px',
                      border: '1px solid #333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={cust.avatar || 'images/icons/profile1.png'} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>{cust.fullName}</h4>
                        <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block' }}>{cust.email}</span>
                        {cust.phone && <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block' }}>Phone: {cust.phone}</span>}
                        {cust.birthday && <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block' }}>Birthday: {cust.birthday}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button
                        onClick={() => openEditCustomer(cust)}
                        className="btn btn-sm"
                        style={{ background: '#ffb300', color: '#122636', padding: '6px 12px', borderRadius: '4px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(cust.id)}
                        className="btn btn-sm"
                        style={{ background: '#d9534f', color: '#fff', padding: '6px 12px', borderRadius: '4px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default AdminOrders;
