const Wishlist = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/profile">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Wishlist</h3>
        </div>
      </div>
    </header>
    

    
    <section>
      <div className="custom-container">
        <div className="row g-3">
          <div className="col-12">
            <div className="horizontal-product-box">
              <a href="#" className="horizontal-product-img">
                <img className="img-fluid img" src="images/product/18.png" alt="p18" />
              </a>
              <div className="horizontal-product-details">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Shiny wooden Chair</h4>
                  <button className="close-button">
                    <i className="iconsax" data-icon="add"></i>
                  </button>
                </div>
                <h5>Qty:1</h5>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="fw-semibold">$130 <del className="light-text fw-normal">$160</del></h3>
                  </div>
                  <a href="#" className="cart-bag">
                    <i className="iconsax bag" data-icon="basket-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="horizontal-product-box">
              <a href="#" className="horizontal-product-img">
                <img className="img-fluid img" src="images/product/19.png" alt="p19" />
              </a>
              <div className="horizontal-product-details">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Bedroom Lamp</h4>
                  <button className="close-button">
                    <i className="iconsax" data-icon="add"></i>
                  </button>
                </div>
                <h5>Qty:1</h5>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="fw-semibold">$30 <del className="light-text fw-normal">$60</del></h3>
                  </div>
                  <a href="#" className="cart-bag">
                    <i className="iconsax bag" data-icon="basket-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="horizontal-product-box">
              <a href="#" className="horizontal-product-img">
                <img className="img-fluid img" src="images/product/20.png" alt="p20" />
              </a>
              <div className="horizontal-product-details">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Marble Flower Vase</h4>
                  <button className="close-button">
                    <i className="iconsax" data-icon="add"></i>
                  </button>
                </div>
                <h5>Qty:1</h5>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="fw-semibold">$50 <del className="light-text fw-normal">$80</del></h3>
                  </div>
                  <a href="#" className="cart-bag">
                    <i className="iconsax bag" data-icon="basket-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <li className="active">
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

export default Wishlist;
