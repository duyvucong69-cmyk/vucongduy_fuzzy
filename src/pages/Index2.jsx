const Index2 = () => {
  return (
    <>
      <section className="section-b-space">
      <div className="swiper intro slider-1">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="theme-logo pb-3">
              <img className="img-fluid logo-img" src="images/logo/logo.png" alt="logo" />
            </div>
            <div className="onboarding-design">
              <img className="img-fluid design-img" src="images/onboarding/design1.png" alt="bg-design" />

              <img className="img-fluid slider-img1" src="images/onboarding/1.png" alt="slider-1" />

              <img className="img-fluid vector1" src="images/onboarding/vector1.png" alt="v1" />
              <img className="img-fluid vector2" src="images/onboarding/vector2.png" alt="v2" />
              <img className="img-fluid vector3" src="images/onboarding/vector3.png" alt="v3" />
            </div>
            <div className="product-details">
              <h1>Office Furniture</h1>
              <span></span>
              <p>The best payment method connects your money to friends, family, brands, and experiences.</p>
              <div className="redirate-btn">
                <a href="#/login" className="next-arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="theme-logo pb-3">
              <img className="img-fluid logo-img" src="images/logo/logo.png" alt="logo" />
            </div>
            <div className="onboarding-design">
              <img className="img-fluid design-img" src="images/onboarding/design1.png" alt="bg-design" />

              <img className="img-fluid slider-img2" src="images/onboarding/2.png" alt="slider-2" />

              <img className="img-fluid vector1" src="images/onboarding/vector1.png" alt="v1" />
              <img className="img-fluid vector2" src="images/onboarding/vector2.png" alt="v2" />
              <img className="img-fluid vector3" src="images/onboarding/vector3.png" alt="v3" />
            </div>
            <div className="product-details">
              <h1>Relaxing Furniture</h1>
              <span></span>
              <p>The best payment method connects your money to friends, family, brands, and experiences.</p>
              <div className="redirate-btn">
                <a href="#/login" className="next-arrow">
                  <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="theme-logo pb-3">
              <img className="img-fluid logo-img" src="images/logo/logo.png" alt="logo" />
            </div>
            <div className="onboarding-design">
              <img className="img-fluid design-img" src="images/onboarding/design1.png" alt="bg-design" />

              <img className="img-fluid slider-img3" src="images/onboarding/3.png" alt="slider-3" />

              <img className="img-fluid vector1" src="images/onboarding/vector1.png" alt="v1" />
              <img className="img-fluid vector2" src="images/onboarding/vector2.png" alt="v2" />
              <img className="img-fluid vector3" src="images/onboarding/vector3.png" alt="v3" />
              <div className="product-details">
                <h1>Home Decor</h1>
                <span></span>
                <p>The best payment method connects your money to friends, family, brands, and experiences.</p>
                <div className="redirate-btn">
                  <a href="#/login" className="next-arrow">
                    <i className="iconsax right-arrow" data-icon="arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    
    <div className="offcanvas offcanvas-bottom addtohome-popup theme-offcanvas" tabIndex="-1" id="offcanvas">
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <div className="offcanvas-body small">
        <div className="app-info">
          <img src="images/logo/48.png" className="img-fluid" alt="" />
          <div className="content">
            <h4>fuzzy app</h4>
            <a href="#">www.fuzzy-app.com</a>
          </div>
        </div>
        <a href="#!" className="btn theme-btn install-app btn-inline home-screen-btn m-0" id="installapp">Add to Home Screen</a>
      </div>
    </div>
    </>
  );
};

export default Index2;
