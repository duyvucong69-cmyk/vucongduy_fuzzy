import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'customers' | 'products'
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  // Customers State
  const [customers, setCustomers] = useState([]);
  const [custLoading, setCustLoading] = useState(false);
  const [custError, setCustError] = useState('');

  // Products State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prodLoading, setProdLoading] = useState(false);
  const [prodError, setProdError] = useState('');

  // Add/Edit Customer Form State
  const [showCustForm, setShowCustForm] = useState(false);
  const [isEditingCust, setIsEditingCust] = useState(false);
  const [custId, setCustId] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [custFullName, setCustFullName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custBirthday, setCustBirthday] = useState('');
  const [custAvatar, setCustAvatar] = useState('images/icons/profile1.png');

  // Add/Edit Product Form State
  const [showProdForm, setShowProdForm] = useState(false);
  const [isEditingProd, setIsEditingProd] = useState(false);
  const [prodId, setProdId] = useState('');
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImageNum, setProdImageNum] = useState('1'); // Select image from 1 to 30
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

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
      if (isEditingCust) {
        await apiFetch('/api/admin/users', { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await apiFetch('/api/admin/users', { method: 'POST', body: JSON.stringify(payload) });
      }
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
      await apiFetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      fetchAllCustomers();
    } catch (err) {
      setCustError(err instanceof Error ? err.message : 'Failed to delete customer.');
    }
  };

  const openAddCustomer = () => {
    setIsEditingCust(false);
    resetCustomerForm();
    setShowCustForm(true);
  };

  const openEditCustomer = (cust) => {
    setIsEditingCust(true);
    setCustId(cust.id);
    setCustEmail(cust.email);
    setCustPassword('');
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

  // --- API CALLS FOR PRODUCTS ---
  const fetchAllProductsAndCategories = async () => {
    setProdLoading(true);
    setProdError('');
    try {
      const cats = await apiFetch('/api/categories');
      setCategories(cats);
      if (cats.length > 0) setProdCategory(cats[0].id);

      const prodsData = await apiFetch('/api/products?limit=100'); // Get up to 100 products for administration list
      setProducts(prodsData.products);
    } catch (err) {
      setProdError(err instanceof Error ? err.message : 'Failed to fetch catalog data.');
    } finally {
      setProdLoading(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setProdError('');

    if (!prodName.trim() || !prodPrice || !prodCategory) {
      setProdError('Name, price and category are required.');
      return;
    }

    const payload = {
      id: prodId,
      name: prodName,
      price: parseFloat(prodPrice),
      stock: parseInt(prodStock || '0', 10),
      categoryId: prodCategory,
      description: prodDesc,
      images: [`images/product/${prodImageNum}.png`], // Dynamic path matching our asset structure
      colors: selectedColors,
      sizes: selectedSizes,
    };

    try {
      if (isEditingProd) {
        await apiFetch('/api/products', { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(payload) });
      }
      resetProductForm();
      fetchAllProductsAndCategories();
    } catch (err) {
      setProdError(err instanceof Error ? err.message : 'Failed to save product.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setProdError('');
    try {
      await apiFetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchAllProductsAndCategories();
    } catch (err) {
      setProdError(err instanceof Error ? err.message : 'Failed to delete product.');
    }
  };

  const openAddProduct = () => {
    setIsEditingProd(false);
    resetProductForm();
    setShowProdForm(true);
  };

  const openEditProduct = (prod) => {
    setIsEditingProd(true);
    setProdId(prod.id);
    setProdName(prod.name);
    setProdPrice(String(prod.price));
    setProdStock(String(prod.stock));
    setProdCategory(prod.categoryId || '');
    setProdDesc(prod.description || '');
    
    // Parse image number from path if possible, default to 1
    const imgMatch = prod.images[0]?.match(/(\d+)\.png/);
    setProdImageNum(imgMatch ? imgMatch[1] : '1');
    
    setSelectedColors(prod.colors || []);
    setSelectedSizes(prod.sizes || []);
    setShowProdForm(true);
    setProdError('');
  };

  const resetProductForm = () => {
    setProdId('');
    setProdName('');
    setProdPrice('');
    setProdStock('');
    if (categories.length > 0) setProdCategory(categories[0].id);
    setProdDesc('');
    setProdImageNum('1');
    setSelectedColors([]);
    setSelectedSizes([]);
    setShowProdForm(false);
    setProdError('');
  };

  const handleColorToggle = (colorHex) => {
    if (selectedColors.includes(colorHex)) {
      setSelectedColors(selectedColors.filter(c => c !== colorHex));
    } else {
      setSelectedColors([...selectedColors, colorHex]);
    }
  };

  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchAllOrders();
    } else if (activeTab === 'customers') {
      fetchAllCustomers();
    } else if (activeTab === 'products') {
      fetchAllProductsAndCategories();
    }
  }, [activeTab]);

  const colorOptions = [
    { name: 'Navy', hex: '#122636' },
    { name: 'Yellow', hex: '#ffb300' },
    { name: 'Red', hex: '#d9534f' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Black', hex: '#000000' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Brown', hex: '#5c4033' },
  ];

  const sizeOptions = ['S', 'M', 'L', 'Standard', 'Queen', 'King', '3-Seater'];

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/profile">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Admin Control Panel</h3>
          </div>
        </div>
      </header>

      {/* Tabs Navigation Toggle Bar */}
      <div className="custom-container" style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
        {['orders', 'customers', 'products'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '10px 5px',
              borderRadius: '8px',
              border: activeTab === tab ? '1px solid #ffb300' : '1px solid #333',
              background: activeTab === tab ? '#ffb300' : '#122636',
              color: activeTab === tab ? '#122636' : '#fff',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
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
          {/* TAB 2: CUSTOMER MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'customers' && (
            <div>
              {custError && <div className="alert alert-danger" style={{ fontSize: '1.3rem', padding: '10px', marginBottom: '15px' }}>{custError}</div>}

              {!showCustForm && (
                <button
                  onClick={openAddCustomer}
                  className="btn theme-btn w-100"
                  style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '25px', border: 'none' }}
                >
                  + Add New Customer
                </button>
              )}

              {showCustForm && (
                <div style={{ background: '#122636', border: '1px solid #ffb300', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', marginBottom: '20px' }}>
                    {isEditingCust ? 'Edit Customer Details' : 'Create New Customer'}
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
                        disabled={isEditingCust}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: isEditingCust ? '#333' : '#1a3245', color: '#fff', fontSize: '1.3rem', cursor: isEditingCust ? 'not-allowed' : 'text' }}
                      />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>
                        Password {isEditingCust ? '(Leave blank to keep same)' : '*'}
                      </label>
                      <input
                        type="password"
                        value={custPassword}
                        onChange={(e) => setCustPassword(e.target.value)}
                        required={!isEditingCust}
                        placeholder={isEditingCust ? 'Enter new password' : 'Enter account password'}
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
                      <button type="button" onClick={resetCustomerForm} className="btn w-50" style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '5px', border: 'none', fontSize: '1.3rem' }}>
                        Cancel
                      </button>
                      <button type="submit" className="btn w-50" style={{ background: '#ffb300', color: '#122636', padding: '10px', borderRadius: '5px', border: 'none', fontWeight: 'bold', fontSize: '1.3rem' }}>
                        {isEditingCust ? 'Save Changes' : 'Create User'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {custLoading && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>Loading customer list...</p>}
              {!custLoading && customers.length === 0 && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>No customers found.</p>}

              <ul style={{ padding: 0, listStyle: 'none' }}>
                {customers.map((cust) => (
                  <li key={cust.id} style={{ background: '#122636', padding: '15px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #333', display: 'flex', alignItems: 'center', justifycontent: 'space-between', justifyContent: 'space-between' }}>
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
                      <button onClick={() => openEditCustomer(cust)} className="btn btn-sm" style={{ background: '#ffb300', color: '#122636', padding: '6px 12px', borderRadius: '4px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteCustomer(cust.id)} className="btn btn-sm" style={{ background: '#d9534f', color: '#fff', padding: '6px 12px', borderRadius: '4px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: PRODUCT MANAGEMENT CRUD */}
          {/* ============================================================== */}
          {activeTab === 'products' && (
            <div>
              {prodError && <div className="alert alert-danger" style={{ fontSize: '1.3rem', padding: '10px', marginBottom: '15px' }}>{prodError}</div>}

              {!showProdForm && (
                <button
                  onClick={openAddProduct}
                  className="btn theme-btn w-100"
                  style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '25px', border: 'none' }}
                >
                  + Add New Product
                </button>
              )}

              {/* Add/Edit Product Form Panel */}
              {showProdForm && (
                <div style={{ background: '#122636', border: '1px solid #ffb300', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', marginBottom: '20px' }}>
                    {isEditingProd ? 'Edit Product Details' : 'Add New Product'}
                  </h3>

                  <form onSubmit={handleSaveProduct}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Product Name *</label>
                      <input
                        type="text"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Price ($) *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={prodPrice}
                          onChange={(e) => setProdPrice(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Stock Quantity</label>
                        <input
                          type="number"
                          value={prodStock}
                          onChange={(e) => setProdStock(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Category *</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem', cursor: 'pointer' }}
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Image Number (1 to 30) *</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={prodImageNum}
                        onChange={(e) => setProdImageNum(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                      />
                      <span style={{ fontSize: '1rem', color: '#aaa', marginTop: '3px', display: 'block' }}>
                        Preview: images/product/{prodImageNum}.png
                      </span>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Description</label>
                      <textarea
                        rows={3}
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1a3245', color: '#fff', fontSize: '1.3rem' }}
                      />
                    </div>

                    {/* Colors multi-select */}
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Select Colors</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {colorOptions.map(c => {
                          const isSelected = selectedColors.includes(c.hex);
                          return (
                            <button
                              type="button"
                              key={c.hex}
                              onClick={() => handleColorToggle(c.hex)}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: c.hex,
                                border: isSelected ? '3px solid #ffb300' : '1px solid #555',
                                cursor: 'pointer',
                                position: 'relative'
                              }}
                              title={c.name}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Sizes multi-select */}
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>Select Sizes</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {sizeOptions.map(s => {
                          const isSelected = selectedSizes.includes(s);
                          return (
                            <button
                              type="button"
                              key={s}
                              onClick={() => handleSizeToggle(s)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '4px',
                                border: '1px solid #444',
                                background: isSelected ? '#ffb300' : 'transparent',
                                color: isSelected ? '#122636' : '#fff',
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                              }}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button type="button" onClick={resetProductForm} className="btn w-50" style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '5px', border: 'none', fontSize: '1.3rem' }}>
                        Cancel
                      </button>
                      <button type="submit" className="btn w-50" style={{ background: '#ffb300', color: '#122636', padding: '10px', borderRadius: '5px', border: 'none', fontWeight: 'bold', fontSize: '1.3rem' }}>
                        {isEditingProd ? 'Save Changes' : 'Add Product'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {prodLoading && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>Loading catalog directory...</p>}
              {!prodLoading && products.length === 0 && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>No products found.</p>}

              {/* Products Grid list for CRUD */}
              <ul style={{ padding: 0, listStyle: 'none' }}>
                {products.map((prod) => (
                  <li
                    key={prod.id}
                    style={{
                      background: '#122636',
                      padding: '12px',
                      borderRadius: '12px',
                      marginBottom: '15px',
                      border: '1px solid #333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '70%' }}>
                      <img
                        src={prod.images[0] || 'images/product/1.png'}
                        alt={prod.name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '75%' }}>
                        <h4 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 3px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {prod.name}
                        </h4>
                        <span style={{ fontSize: '1.1rem', color: '#ffb300', fontWeight: 'bold' }}>Price: ${prod.price}</span>
                        <span style={{ fontSize: '1.1rem', color: '#aaa', display: 'block' }}>Stock Level: {prod.stock}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button
                        onClick={() => openEditProduct(prod)}
                        className="btn btn-sm"
                        style={{ background: '#ffb300', color: '#122636', padding: '5px 10px', borderRadius: '4px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="btn btn-sm"
                        style={{ background: '#d9534f', color: '#fff', padding: '5px 10px', borderRadius: '4px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}
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
