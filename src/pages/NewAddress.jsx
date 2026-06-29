import { useState } from 'react';
import { apiFetch } from '../utils/auth';

const NewAddress = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [isDefault, setIsDefault] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!name.trim() || !phone.trim() || !streetAddress.trim() || !city.trim() || !pinCode.trim()) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const combinedAddress = `${streetAddress}${landmark ? ', Landmark: ' + landmark : ''}, ${city} - ${pinCode}`;

    try {
      await apiFetch('/api/user/addresses', {
        method: 'POST',
        body: JSON.stringify({
          name: `${addressType} (${name})`,
          phone,
          addressDetails: combinedAddress,
          isDefault
        }),
      });

      setSuccess('Address added successfully!');
      setTimeout(() => {
        window.location.hash = '#/manage-address';
      }, 1200);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/manage-address">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Add New Address</h3>
          </div>
        </div>
      </header>

      <section className="section-b-space" style={{ marginTop: '20px' }}>
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger" style={{ fontSize: '1.4rem', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" style={{ fontSize: '1.4rem', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
              {success}
            </div>
          )}

          <form className="address-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Contact Name *</label>
              <div className="form-input mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter contact name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <div className="form-input mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <div className="form-input mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter street name and house number"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Landmark</label>
              <div className="form-input mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter landmark (optional)"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <div className="form-input mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className="form-label">Pin Code *</label>
                  <div className="form-input mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter pin code"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ margin: '15px 0' }}>
              <label className="form-label">Address Type</label>
              <ul className="address-type" style={{ display: 'flex', gap: '15px', listStyle: 'none', padding: 0 }}>
                {['Home', 'Office', 'Other'].map((type) => (
                  <li key={type}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addressTypeRadio"
                        id={`type-${type}`}
                        checked={addressType === type}
                        onChange={() => setAddressType(type)}
                      />
                      <label className="form-check-label" htmlFor={`type-${type}`} style={{ marginLeft: '5px', fontSize: '1.3rem' }}>
                        {type}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group" style={{ margin: '20px 0' }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="defaultAddressCheckbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="defaultAddressCheckbox" style={{ marginLeft: '5px', fontSize: '1.3rem' }}>
                  Set as Default Address
                </label>
              </div>
            </div>
            
            <section className="panel-space"></section>
            
            <div className="footer-modal d-flex gap-3">
              <a href="#/manage-address" className="btn gray-btn btn-inline mt-0 w-50" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
                Cancel
              </a>
              <button type="submit" className="theme-btn btn btn-inline mt-0 w-50" disabled={loading} style={{ background: '#ffb300', color: '#fff', border: 'none', fontWeight: 'bold' }}>
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewAddress;
