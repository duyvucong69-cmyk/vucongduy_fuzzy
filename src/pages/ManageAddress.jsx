import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/auth';

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/api/user/addresses');
      setAddresses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load addresses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSetDefault = async (id) => {
    try {
      const data = await apiFetch('/api/user/addresses', {
        method: 'PUT',
        body: JSON.stringify({ id, isDefault: true })
      });
      setAddresses(data.addresses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update default address.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      const data = await apiFetch(`/api/user/addresses?id=${id}`, {
        method: 'DELETE'
      });
      setAddresses(data.addresses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete address.');
    }
  };

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/profile">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Saved Address</h3>
          </div>
        </div>
      </header>

      <section className="shipping-details-sec" style={{ marginTop: '20px' }}>
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger" style={{ fontSize: '1.4rem', padding: '10px', borderRadius: '5px' }}>
              {error}
            </div>
          )}

          {loading && <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem' }}>Loading addresses...</p>}

          {!loading && addresses.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '1.4rem', margin: '40px 0' }}>
              No addresses saved yet.
            </p>
          )}

          <ul className="address-list">
            {addresses.map((addr) => (
              <li key={addr.id} style={{ marginBottom: '15px' }}>
                <div className={`shipping-address ${addr.isDefault ? 'active' : ''}`} style={{ border: addr.isDefault ? '1px solid #ffb300' : '1px solid #eee', borderRadius: '8px', padding: '15px', position: 'relative' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addressRadio"
                        id={`radio-${addr.id}`}
                        checked={addr.isDefault}
                        onChange={() => handleSetDefault(addr.id)}
                      />
                      <label className="form-check-label" htmlFor={`radio-${addr.id}`} style={{ fontWeight: 'bold', fontSize: '1.4rem', marginLeft: '5px' }}>
                        {addr.name} {addr.isDefault && <span style={{ color: '#ffb300', fontSize: '1.1rem', marginLeft: '10px' }}>(Default)</span>}
                      </label>
                    </div>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#d9534f',
                        cursor: 'pointer',
                        fontSize: '1.4rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="address-details" style={{ marginTop: '10px' }}>
                    <p style={{ fontSize: '1.3rem', margin: '0 0 5px', color: '#666' }}>{addr.addressDetails}</p>
                    <h5 className="content-number" style={{ fontSize: '1.2rem', margin: 0 }}>
                      Phone no. : <span>{addr.phone}</span>
                    </h5>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <a href="#/new-address" className="btn theme-btn w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#ffb300', color: '#fff', padding: '12px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
              Add New Address
            </a>
          </div>
        </div>
      </section>

      <section className="panel-space"></section>
    </>
  );
};

export default ManageAddress;
