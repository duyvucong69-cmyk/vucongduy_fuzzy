const Categories = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <h3>Categories</h3>
          <a href="#/notification" className="notification"> <i className="iconsax notification-icon" data-icon="bell-2"></i> </a>
        </div>
      </div>
    </header>
    

    
    <section>
      <div className="custom-container">
        <form className="theme-form search-head" target="_blank">
          <div className="form-group">
            <div className="form-input w-100">
              <input type="text" className="form-control search" id="inputusername" placeholder="Search here..." />
              <i className="iconsax search-icon" data-icon="search-normal-2"></i>
            </div>
          </div>
        </form>
      </div>
    </section>
    

    
    <section>
      <div className="custom-container">
        <ul className="categories-list">
          <li className="mt-0">
            <a href="#/shop" className="d-flex align-items-center">
              <div className="ps-3">
                <h2>Chairs</h2>
                <h4 className="mt-1">Total 120 item available</h4>
                <div className="arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </div>
              </div>
              <div className="categories-img">
                <img className="img-fluid img" src="images/product/3.png" alt="p3" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/shop" className="d-flex align-items-center">
              <div className="ps-3">
                <h2>Tables</h2>
                <h4 className="mt-1">Total 120 item available</h4>
                <div className="arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </div>
              </div>
              <div className="categories-img">
                <img className="img-fluid categories img" src="images/product/21.png" alt="p21" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/shop" className="d-flex align-items-center">
              <div className="ps-3">
                <h2>Sofas</h2>
                <h4 className="mt-1">Total 120 item available</h4>
                <div className="arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </div>
              </div>
              <div className="categories-img">
                <img className="img-fluid categories img" src="images/product/11.png" alt="p11" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/shop" className="d-flex align-items-center">
              <div className="ps-3">
                <h2>Hanging chairs</h2>
                <h4 className="mt-1">Total 120 item available</h4>
                <div className="arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </div>
              </div>
              <div className="categories-img">
                <img className="img-fluid categories img" src="images/product/22.png" alt="p22" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/shop" className="d-flex align-items-center">
              <div className="ps-3">
                <h2>Cabinets</h2>
                <h4 className="mt-1">Total 120 item available</h4>
                <div className="arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </div>
              </div>
              <div className="categories-img">
                <img className="img-fluid categories img" src="images/product/23.png" alt="p23" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/shop" className="d-flex align-items-center">
              <div className="ps-3">
                <h2>Lamp</h2>
                <h4 className="mt-1">Total 120 item available</h4>
                <div className="arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </div>
              </div>
              <div className="categories-img">
                <img className="img-fluid categories img" src="images/product/24.png" alt="p24" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/shop" className="d-flex align-items-center">
              <div className="ps-3">
                <h2>Cupboard</h2>
                <h4 className="mt-1">Total 120 item available</h4>
                <div className="arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </div>
              </div>
              <div className="categories-img">
                <img className="img-fluid categories img" src="images/product/25.png" alt="p25" />
              </div>
            </a>
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
        <li className="active">
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

export default Categories;
