import { useState, useEffect } from 'react';
import { apiFetch, clearAuth, getUser, saveUser } from '../utils/auth';

const Profile = () => {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    // Fetch fresh user profile on mount
    apiFetch('/api/user/profile')
      .then((freshUser) => {
        setUser(freshUser);
        saveUser(freshUser);
      })
      .catch((err) => {
        console.warn('Failed to load profile from backend:', err);
      });
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.location.hash = '#/login';
  };

  const displayName = user?.fullName || 'Guest User';
  const displayAvatar = user?.avatar || 'images/icons/profile1.png';

  return (
    <>
      <header className="profile-header section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <h3>Profile</h3>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="profile-pic mt-5">
              <img className="img-fluid img" src={displayAvatar} alt="profile" style={{ borderRadius: '50%', width: '60px', height: '60px', objectFit: 'cover' }} />
            </div>
            <div className="profile-name d-flex align-items-center justify-content-between mt-3 w-100">
              <div>
                <h4 className="theme-color" style={{ margin: 0 }}>{displayName}</h4>
                {user?.email && <span style={{ fontSize: '1.2rem', color: '#999' }}>{user.email}</span>}
              </div>
              <a href="#/profile-setting">
                <i className="iconsax edit-icon" data-icon="edit-1"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section-b-space pt-0">
        <div className="custom-container">
          <ul className="profile-list">
            <li>
              <a href="#/order-history" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="box"></i>
                </div>
                <div className="profile-details">
                  <h4>Orders</h4>
                  <h5>Ongoing orders, Recent orders..</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/wishlist" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="heart"></i>
                </div>
                <div className="profile-details">
                  <h4>Wishlist</h4>
                  <h5>Your save product</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/manage-payment" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="wallet-open"></i>
                </div>
                <div className="profile-details">
                  <h4>Payment</h4>
                  <h5>Saved card, Wallets</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/manage-address" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="location"></i>
                </div>
                <div className="profile-details">
                  <h4>Saved Address</h4>
                  <h5>Home, Office</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/admin-orders" className="profile-box">
                <div className="profile-img" style={{ border: '1px solid #ffb300' }}>
                  <i className="iconsax icon" data-icon="setting-2" style={{ color: '#ffb300' }}></i>
                </div>
                <div className="profile-details">
                  <h4 style={{ color: '#ffb300' }}>Admin Portal</h4>
                  <h5>Manage all customer orders</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/language" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="translate"></i>
                </div>
                <div className="profile-details">
                  <h4>Language</h4>
                  <h5>Select your language here</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/notification" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="bell-1"></i>
                </div>
                <div className="profile-details">
                  <h4>Notification</h4>
                  <h5>Offers, Order tracking messages</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/setting" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="setting-1"></i>
                </div>
                <div className="profile-details">
                  <h4>Settings</h4>
                  <h5>app settings, Dark mode</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/terms-conditions" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="info-circle"></i>
                </div>
                <div className="profile-details">
                  <h4>Terms & Conditions</h4>
                  <h5>T&C for use of platform</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="#/help" className="profile-box">
                <div className="profile-img">
                  <i className="iconsax icon" data-icon="phone"></i>
                </div>
                <div className="profile-details">
                  <h4>Help</h4>
                  <h5>Customer Support, FAQs</h5>
                </div>
              </a>
            </li>
            <li className="border-bottom-0" style={{ marginTop: '20px' }}>
              <button onClick={handleLogout} className="btn w-100" style={{ background: '#d9534f', color: '#fff', fontSize: '1.4rem', padding: '12px', borderRadius: '5px', border: 'none' }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </section>

      <section className="panel-space"></section>

      <div className="navbar-menu">
        <ul>
          <li>
            <a href="#/landing">
              <div className="icon">
                <img className="unactive" src="images/svg/home.svg" alt="home" />
                <img className="active" src="images/svg/home-fill.svg" alt="home" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/categories">
              <div className="icon">
                <img className="unactive" src="images/svg/categories.svg" alt="categories" />
                <img className="active" src="images/svg/categories-fill.svg" alt="categories" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/cart">
              <div className="icon">
                <img className="unactive" src="images/svg/bag.svg" alt="bag" />
                <img className="active" src="images/svg/bag-fill.svg" alt="bag" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/wishlist">
              <div className="icon">
                <img className="unactive" src="images/svg/heart.svg" alt="heart" />
                <img className="active" src="images/svg/heart-fill.svg" alt="heart" />
              </div>
            </a>
          </li>
          <li className="active">
            <a href="#/profile">
              <div className="icon">
                <img className="unactive" src="images/svg/profile.svg" alt="profile" />
                <img className="active" src="images/svg/profile-fill.svg" alt="profile" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
