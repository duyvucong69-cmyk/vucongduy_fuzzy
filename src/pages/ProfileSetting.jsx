import { useState, useEffect } from 'react';
import { apiFetch, getUser, saveUser } from '../utils/auth';

const ProfileSetting = () => {
  const cachedUser = getUser();
  const [fullName, setFullName] = useState(cachedUser?.fullName || '');
  const [email, setEmail] = useState(cachedUser?.email || '');
  const [phone, setPhone] = useState(cachedUser?.phone || '');
  const [birthday, setBirthday] = useState(cachedUser?.birthday || '');
  const [avatar, setAvatar] = useState(cachedUser?.avatar || 'images/icons/profile1.png');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch fresh details from backend
    apiFetch('/api/user/profile')
      .then((data) => {
        setFullName(data.fullName || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setBirthday(data.birthday || '');
        setAvatar(data.avatar || 'images/icons/profile1.png');
        saveUser(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile.');
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!fullName.trim()) {
      setError('Name cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const data = await apiFetch('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify({
          fullName,
          phone,
          birthday,
          avatar
        })
      });

      setSuccess('Profile updated successfully!');
      saveUser(data.user);
      
      // Auto redirect to profile after 1.5 seconds
      setTimeout(() => {
        window.location.hash = '#/profile';
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  const avatarOptions = [
    'images/icons/profile1.png',
    'images/icons/profile2.png',
    'images/icons/profile3.png',
  ];

  return (
    <>
      <header className="profile-header section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/profile">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>Profile Settings</h3>
          </div>
          <div className="profile-setting-pic mx-auto">
            <img
              className="img-fluid img"
              src={avatar}
              alt="profile"
              style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #ffb300' }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '1.2rem', color: '#999', display: 'block', marginBottom: '5px' }}>Choose Avatar</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              {avatarOptions.map((opt) => (
                <img
                  key={opt}
                  src={opt}
                  alt="avatar option"
                  onClick={() => setAvatar(opt)}
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: avatar === opt ? '2px solid #ffb300' : '2px solid transparent',
                    boxSizing: 'border-box'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <form className="theme-form profile-setting mt-5" onSubmit={handleSave}>
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger" role="alert" style={{ fontSize: '1.4rem', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert" style={{ fontSize: '1.4rem', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
              {success}
            </div>
          )}

          <div className="form-group d-block">
            <label htmlFor="inputname" className="form-label">Name</label>
            <div className="form-input mb-4">
              <input
                type="text"
                className="form-control"
                id="inputname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <i className="iconsax icons" data-icon="user-1"></i>
            </div>
          </div>

          <div className="form-group d-block">
            <label htmlFor="inputuseremail" className="form-label">Email ID</label>
            <div className="form-input mb-4">
              <input
                type="email"
                className="form-control"
                id="inputuseremail"
                value={email}
                disabled
                style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
              />
              <i className="iconsax icons" data-icon="mail"></i>
            </div>
          </div>

          <div className="form-group d-block mb-4">
            <label htmlFor="inputusernumber" className="form-label">Phone Number</label>
            <div className="form-input">
              <input
                type="text"
                className="form-control"
                id="inputusernumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <i className="iconsax icons" data-icon="phone"></i>
            </div>
          </div>

          <div className="form-group d-block mb-4">
            <label htmlFor="inputbirthday" className="form-label">Birthday</label>
            <div className="form-input">
              <input
                type="date"
                className="form-control"
                id="inputbirthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
              <i className="iconsax icons" data-icon="calendar" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}></i>
            </div>
          </div>

          <div className="footer-modal d-flex gap-3" style={{ marginTop: '30px' }}>
            <a href="#/profile" className="btn gray-btn btn-inline mt-0 w-50">Cancel</a>
            <button type="submit" className="theme-btn btn btn-inline mt-0 w-50" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>

      <section className="panel-space"></section>
    </>
  );
};

export default ProfileSetting;
