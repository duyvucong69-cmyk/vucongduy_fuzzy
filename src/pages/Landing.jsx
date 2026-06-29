import { useState, useEffect } from 'react';
import { apiFetch, getUser, clearAuth } from '../utils/auth';

const Landing = () => {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const user = getUser();

  useEffect(() => {
    // 1. Fetch categories
    apiFetch('/api/categories')
      .then(data => setCategories(data))
      .catch(err => console.warn('Categories load error:', err));

    // 2. Fetch new arrivals (latest 4 products)
    apiFetch('/api/products?limit=4&sort=newest')
      .then(data => setNewArrivals(data.products))
      .catch(err => console.warn('New Arrivals load error:', err));
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.location.hash = '#/login';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.hash = `#/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Sidebar Offcanvas */}
      <div className="offcanvas sidebar-offcanvas offcanvas-start" tabIndex={-1} id="offcanvasLeft">
        <div className="offcanvas-header">
          <img className="img-fluid profile-pic" src={user?.avatar || "images/icons/profile.png"} alt="profile" />
          <h4>Hello, {user?.fullName || 'Guest'}!</h4>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="sidebar-content">
            <ul className="link-section">
              <li>
                <div className="pages">
                  <h4>RTL</h4>
                  <div className="switch-btn">
                    <input id="dir-switch" type="checkbox" />
                  </div>
                </div>
              </li>
              <li>
                <div className="pages">
                  <h4>Dark Mode</h4>
                  <div className="switch-btn">
                    <input id="dark-switch" type="checkbox" />
                  </div>
                </div>
              </li>
              <li>
                <a href="#/profile" className="pages">
                  <h4>Profile Setting</h4>
                </a>
              </li>
              <li>
                <button onClick={handleLogout} className="btn w-100 text-start pages" style={{ background: 'none', border: 'none', padding: 0 }}>
                  <h4 style={{ color: '#d9534f' }}>Logout</h4>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header">
            <div className="head-content">
              <button className="sidebar-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft">
                <i className="iconsax menu-icon" data-icon="menu-hamburger"></i>
              </button>
              <div className="header-info">
                <img className="img-fluid profile-pic" src={user?.avatar || "images/icons/profile.png"} alt="profile" style={{ borderRadius: '50%', width: '40px', height: '40px', objectFit: 'cover' }} />
                <div>
                  <h4 className="light-text">Hello</h4>
                  <h2 className="theme-color">{user?.fullName || 'Guest'}!</h2>
                </div>
              </div>
            </div>
            <a href="#/notification" className="notification">
              <i className="iconsax notification-icon" data-icon="bell-2"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Search head */}
      <section>
        <div className="custom-container">
          <form className="theme-form search-head" onSubmit={handleSearchSubmit}>
            <div className="form-group">
              <div className="form-input">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="iconsax search-icon" data-icon="search-normal-2"></i>
              </div>
              <button type="submit" className="btn filter-btn mt-0" style={{ border: 'none' }}>
                <i className="iconsax filter-icon" data-icon="media-sliders-3"></i>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Banner */}
      <section className="banner-wapper">
        <div className="custom-container">
          <div className="banner-bg">
            <img className="img-fluid img-bg w-100" src="images/banner/banner-1.jpg" alt="banner-1" />
            <div className="banner-content">
              <h2 className="fw-semibold">Best Selling</h2>
              <h4>Comforts & Modern life Stylish Sofa</h4>
            </div>
            <a href="#/shop" className="more-btn">
              <h4>View More</h4>
              <i className="iconsax right-arrow" data-icon="arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="custom-container">
          <div className="swiper categories">
            <div className="swiper-wrapper ratio_square">
              {categories.map((cat, idx) => (
                <div key={cat.id} className="swiper-slide">
                  <a
                    href={`#/shop?categoryId=${cat.id}`}
                    className={`categories-item ${idx === 0 ? 'active' : ''}`}
                  >
                    {cat.name.toLowerCase() === 'sofas' && (
                      <img className="categories-img" src="images/svg/sofa.svg" alt="sofa" />
                    )}
                    <h4>{cat.name}</h4>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-t-space">
        <div className="custom-container">
          <div className="title">
            <h2>New Arrivals</h2>
            <a href="#/shop">View All</a>
          </div>

          <div className="row g-3">
            {newArrivals.map((prod) => (
              <div key={prod.id} className="col-6">
                <div className="product-box">
                  <div className="product-box-img">
                    <a href={`#/product-details?id=${prod.id}`}>
                      <img className="img" src={prod.images[0]} alt={prod.name} />
                    </a>
                    <div className="cart-box">
                      <a href={`#/product-details?id=${prod.id}`} className="cart-bag">
                        <i className="iconsax bag" data-icon="basket-2"></i>
                      </a>
                    </div>
                  </div>
                  
                  <div className="like-btn animate active inactive">
                    <img className="outline-icon" src="images/svg/like.svg" alt="like" />
                    <img className="fill-icon" src="images/svg/like-fill.svg" alt="like" />
                    <div className="effect-group">
                      <span className="effect"></span>
                      <span className="effect"></span>
                      <span className="effect"></span>
                      <span className="effect"></span>
                      <span className="effect"></span>
                    </div>
                  </div>

                  <div className="product-box-detail">
                    <h4>
                      <a href={`#/product-details?id=${prod.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{prod.name}</a>
                    </h4>
                    <h5>Modern e-commerce item</h5>
                    <div className="bottom-panel">
                      <div className="price">
                        <h4>${prod.price}</h4>
                      </div>
                      <div className="rating">
                        <img src="images/svg/Star.svg" alt="star" />
                        <h6>{prod.rating}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-space"></section>

      {/* Navbar Menu */}
      <div className="navbar-menu">
        <ul>
          <li className="active">
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
          <li>
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

export default Landing;
