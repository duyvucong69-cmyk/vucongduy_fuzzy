const Product2Details = () => {
  return (
    <>
      <header className="product2-header">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/categories">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Chairs</h3>
          <div className="d-flex gap-2">
            <a href="#/search" className="search">
              <i className="iconsax icons" data-icon="search-normal-2"></i>
            </a>

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
          </div>
        </div>
      </div>
    </header>
    

    
    <section className="product2-image-section">
      <div className="custom-container">
        <div className="product2-img-slider">
          <img className="img-fluid product2-bg" src="images/background/product-img-bg.png" alt="product-bg" />
          <div className="swiper product-2">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img className="img-fluid product-img" src="images/product/29.png" alt="p26" />
              </div>
              <div className="swiper-slide swiper-slide-active">
                <img className="img-fluid product-img active" src="images/product/28.png" alt="p27" />
              </div>
              <div className="swiper-slide">
                <img className="img-fluid product-img" src="images/product/30.png" alt="p26" />
              </div>
            </div>
            <div className="swiper-button-next">
              <i className="iconsax arrow" data-icon="arrow-right"></i>
            </div>
            <div className="swiper-button-prev">
              <i className="iconsax arrow" data-icon="arrow-left"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
    

    
    <section className="position-relative">
      <img src="images/effect.png" className="img-fluid product-details-effect" alt="effect" />
      <img className="img-fluid product-details-effect-dark" src="images/effect-dark.png" alt="effect-dark" />
      <ul className="color-option">
        <li className="product-color color1"></li>
        <li className="product-color color2"></li>
        <li className="product-color color3"></li>
        <li className="product-color color4"></li>
      </ul>
      <div className="custom-container">
        <div className="product-details">
          <div className="product-name">
            <h2 className="theme-color">Buddy Chair</h2>
            <h6>20% OFF</h6>
          </div>
          <p className="mt-1">The buddy chair with modern comfort and durable fabric.</p>

          <div className="product-price">
            <h3>$102.25 <del>$120.00</del></h3>
            <div className="plus-minus">
              <i className="iconsax sub" data-icon="minus"></i>
              <input type="number" defaultValue="1" min="1" max="10" />
              <i className="iconsax add" data-icon="add"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between gap-3">
            <div className="dimensions-box">
              <div className="d-block">
                <i className="iconsax dimensions-icons icon1" data-icon="ruler"></i>
                <h6>115 cm</h6>
              </div>
            </div>
            <div className="dimensions-box">
              <div className="d-block">
                <i className="iconsax dimensions-icons" data-icon="ruler"></i>
                <h6>115 cm</h6>
              </div>
            </div>
            <div className="dimensions-box">
              <div className="d-block">
                <i className="iconsax dimensions-icons" data-icon="measure"></i>
                <h6>115 cm</h6>
              </div>
            </div>
            <div className="dimensions-box">
              <div className="d-block">
                <i className="iconsax dimensions-icons" data-icon="weights"></i>
                <h6>115 cm</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section>
      <div className="delivery-sec">
        <h4 className="fw-semibold theme-color">Check Delivery</h4>
        <h4 className="fw-normal light-text mt-1">Enter pincode to check delivery date / pickup</h4>

        <div className="input-group">
          <input type="text" className="form-control" placeholder="Pincode" />
          <button className="btn theme-btn" type="button" id="button-addon2">Check</button>
        </div>

        <div className="d-flex justify-content-between gap-3">
          <div className="dimensions-box delivery-box">
            <div className="d-block">
              <i className="iconsax dimensions-icons" data-icon="truck-fast"></i>
              <h6>Free Delivery</h6>
            </div>
          </div>
          <div className="dimensions-box delivery-box">
            <div className="d-block">
              <i className="iconsax dimensions-icons" data-icon="dollar-circle"></i>
              <h6>Cash On Delivery</h6>
            </div>
          </div>
          <div className="dimensions-box delivery-box">
            <div className="d-block">
              <i className="iconsax dimensions-icons" data-icon="box-rotate"></i>
              <h6>21 days Return</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
    

    
    <section>
      <div className="custom-container">
        <h4 className="theme-color fw-semibold">Details :</h4>
        <p className="theme-color fw-normal mt-1">This product is eligible for returns and size replacements from the 'My Orders' section. <span className="theme-color fw-medium">... Read More</span></p>
      </div>
    </section>
    

    
    <section>
      <div className="custom-container">
        <div className="rating-sec">
          <div className="total-rating">
            <h2 className="theme-color">5.0</h2>
            <ul className="rating-stars mt-1">
              <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
              <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
              <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
              <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
              <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
            </ul>
            <h6 className="light-text text-center lh-base fw-normal mt-2">25,586 Rating \ <span className="theme-color fw-normal">430 Reviews</span></h6>
          </div>

          <ul className="progress-main">
            <li>
              <span>5</span>
              <img className="img-fluid stars" src="images/svg/Star.svg" alt="star" />
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bar1"></div>
              </div>
              <h4>90%</h4>
            </li>
            <li>
              <span>4</span>
              <img className="img-fluid stars" src="images/svg/Star.svg" alt="star" />
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bar2"></div>
              </div>
              <h4>75%</h4>
            </li>
            <li>
              <span>3</span>
              <img className="img-fluid stars" src="images/svg/Star.svg" alt="star" />
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bar3"></div>
              </div>
              <h4>50%</h4>
            </li>
            <li>
              <span>2</span>
              <img className="img-fluid stars" src="images/svg/Star.svg" alt="star" />
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bar4"></div>
              </div>
              <h4>25%</h4>
            </li>
            <li>
              <span>1</span>
              <img className="img-fluid stars" src="images/svg/Star.svg" alt="star" />
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bar5"></div>
              </div>
              <h4>10%</h4>
            </li>
          </ul>
        </div>
        <a href="#my-review" className="my-review" data-bs-toggle="offcanvas" role="button">+ Write Your Review</a>
      </div>
    </section>
    

    
    <section className="similer-product">
      <div className="custom-container">
        <div className="title">
          <h2>Similar Products</h2>
          <a href="#/shop">View All</a>
        </div>

        <div className="swiper similer-product">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="product-box">
                <div className="product-box-img">
                  <a href="#/product-details"> <img className="img" src="images/product/1.png" alt="p1" /></a>

                  <div className="cart-box">
                    <a href="#/cart" className="cart-bag">
                      <i className="iconsax bag" data-icon="basket-2"></i>
                    </a>
                  </div>
                </div>
                <div className="product-box-detail">
                  <h4>Buddy Chair</h4>
                  <h5>Modern saddle arms</h5>
                  <div className="bottom-panel">
                    <div className="price">
                      <h4>$14 <del className="pev-price">$20</del></h4>
                    </div>
                    <div className="rating">
                      <img src="images/svg/Star.svg" alt="star" />
                      <h6>4.5</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="product-box">
                <div className="product-box-img">
                  <a href="#/product-details"> <img className="img" src="images/product/2.png" alt="p2" /></a>

                  <div className="cart-box">
                    <a href="#/cart" className="cart-bag">
                      <i className="iconsax bag" data-icon="basket-2"></i>
                    </a>
                  </div>
                </div>
                <div className="product-box-detail">
                  <h4>Wingback Chair</h4>
                  <h5>Modern saddle arms</h5>
                  <div className="bottom-panel">
                    <div className="price">
                      <h4>$15 <del className="pev-price">$18</del></h4>
                    </div>
                    <div className="rating">
                      <img src="images/svg/Star.svg" alt="star" />
                      <h6>4.5</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="product-box">
                <div className="product-box-img">
                  <a href="#/product-details"> <img className="img" src="images/product/14.png" alt="p14" /></a>

                  <div className="cart-box">
                    <a href="#/cart" className="cart-bag">
                      <i className="iconsax bag" data-icon="basket-2"></i>
                    </a>
                  </div>
                </div>
                <div className="product-box-detail">
                  <h4>Winston Chair</h4>
                  <h5>Modern saddle arms</h5>
                  <div className="bottom-panel">
                    <div className="price">
                      <h4>$20 <del className="pev-price">$22</del></h4>
                    </div>
                    <div className="rating">
                      <img src="images/svg/Star.svg" alt="star" />
                      <h6>4.5</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="product-box">
                <div className="product-box-img">
                  <a href="#/product-details"> <img className="img" src="images/product/15.png" alt="p15" /></a>

                  <div className="cart-box">
                    <a href="#/cart" className="cart-bag">
                      <i className="iconsax bag" data-icon="basket-2"></i>
                    </a>
                  </div>
                </div>
                <div className="product-box-detail">
                  <h4>Beige Chair</h4>
                  <h5>Modern saddle arms</h5>
                  <div className="bottom-panel">
                    <div className="price">
                      <h4>$16 <del className="pev-price">$21</del></h4>
                    </div>
                    <div className="rating">
                      <img src="images/svg/Star.svg" alt="star" />
                      <h6>4.5</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="product-box">
                <div className="product-box-img">
                  <a href="#/product-details"> <img className="img" src="images/product/16.png" alt="p16" /></a>

                  <div className="cart-box">
                    <a href="#/cart" className="cart-bag">
                      <i className="iconsax bag" data-icon="basket-2"></i>
                    </a>
                  </div>
                </div>
                <div className="product-box-detail">
                  <h4>Dining Chair</h4>
                  <h5>Modern saddle arms</h5>
                  <div className="bottom-panel">
                    <div className="price">
                      <h4>$12 <del className="pev-price">$15</del></h4>
                    </div>
                    <div className="rating">
                      <img src="images/svg/Star.svg" alt="star" />
                      <h6>4.5</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="product-box">
                <div className="product-box-img">
                  <a href="#/product-details">
                    <img className="img" src="images/product/17.png" alt="p17" />
                  </a>

                  <div className="cart-box">
                    <a href="#/cart" className="cart-bag">
                      <i className="iconsax bag" data-icon="basket-2"></i>
                    </a>
                  </div>
                </div>
                <div className="product-box-detail">
                  <h4>Harbour Chair</h4>
                  <h5>Modern saddle arms</h5>
                  <div className="bottom-panel">
                    <div className="price">
                      <h4>$17 <del className="pev-price">$23</del></h4>
                    </div>
                    <div className="rating">
                      <img src="images/svg/Star.svg" alt="star" />
                      <h6>4.5</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    

    
    <div className="offcanvas offcanvas-bottom my-review-offcanvas" tabIndex="-1" id="my-review">
      <div className="offcanvas-header review-head">
        <h4 className="offcanvas-title" id="offcanvasBottomLabel">Create Review</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body review-body">
        <div className="rating-sec d-flex align-items-center justify-content-start gap-1 border-0 p-0">
          <h4 className="theme-color fw-normal">Rating :</h4>

          <ul className="rating-stars">
            <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
            <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
            <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
            <li><img className="img-fluid stars" src="images/svg/Star.svg" alt="star" /></li>
            <li><img className="img-fluid stars" src="images/svg/star1.svg" alt="star" /></li>
          </ul>
        </div>

        <form className="theme-form">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label htmlFor="name" className="form-check-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Your name" required="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label htmlFor="email" className="form-check-label">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Email" required="" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mt-3">
                <label className="form-check-label" htmlFor="review">Review Title</label>
                <input type="text" className="form-control" id="review" placeholder="Enter your Review Subjects" required="" />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mt-3">
                <label className="form-check-label">Add a Photo or Video</label>
                <div className="upload-image">
                  <div id="upload-file" className="my-dropzone"></div>
                  <div className="upload-icon">
                    <i className="iconsax add-icon" data-icon="add"></i>
                    <h6>Upload</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mt-3">
                <label htmlFor="review" className="form-check-label">Review</label>
                <textarea className="form-control" placeholder="Write Your Review Here" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>

            <div className="col-md-12">
              <a href="#/product-details" className="btn theme-btn mt-3">Submit Your Review</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    

    
    <section className="panel-space"></section>
    

    
    <section className="fixed-cart-btn section-b-space">
      <div className="custom-container">
        <a href="#/cart" className="cart-box-sec">
          <div className="d-flex align-items-center gap-2">
            <i className="iconsax bag" data-icon="basket-2"></i>
            <h2>Add to cart</h2>
          </div>
          <h2>$102.25</h2>
        </a>
      </div>
    </section>
    

    
    <section className="panel-space"></section>
    </>
  );
};

export default Product2Details;
