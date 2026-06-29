const Shipping = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/checkout">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Choose Shipping</h3>
        </div>
      </div>
    </header>
    

    
    <section>
      <div className="custom-container">
        <div className="row g-3">
          <div className="col-12">
            <div className="shipping-box">
              <a href="#">
                <i className="iconsax icons" data-icon="box-tick"></i>
              </a>
              <div className="shipping-details">
                <div className="shipping-info">
                  <h4>Economy</h4>
                  <h5>Estimated Arrival, Mar 20-23</h5>
                </div>
                <div className="price">
                  <div className="form-check form-check-reverse">
                    <label className="form-check-label" htmlFor="radio1">$10</label>
                    <input className="form-check-input" type="radio" name="exampleRadio" id="radio1" defaultValue="option2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="shipping-box">
              <a href="#">
                <i className="iconsax icons" data-icon="package"></i>
              </a>
              <div className="shipping-details">
                <div className="shipping-info">
                  <h4>Regular</h4>
                  <h5>Estimated Arrival, Mar 20-22</h5>
                </div>
                <div className="price">
                  <div className="form-check form-check-reverse">
                    <label className="form-check-label" htmlFor="radio2">$15</label>
                    <input className="form-check-input" type="radio" name="exampleRadio" id="radio2" defaultValue="option2" defaultChecked={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="shipping-box">
              <a href="#">
                <i className="iconsax icons" data-icon="truck"></i>
              </a>
              <div className="shipping-details">
                <div className="shipping-info">
                  <h4>Cargo</h4>
                  <h5>Estimated Arrival, Mar 19-20</h5>
                </div>
                <div className="price">
                  <div className="form-check form-check-reverse">
                    <label className="form-check-label" htmlFor="radio3">$20</label>
                    <input className="form-check-input" type="radio" name="exampleRadio" id="radio3" defaultValue="option3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="shipping-box">
              <a href="#">
                <i className="iconsax icons" data-icon="truck-fast"></i>
              </a>
              <div className="shipping-details">
                <div className="shipping-info">
                  <h4>Express</h4>
                  <h5>Estimated Arrival, Mar 18-19</h5>
                </div>
                <div className="price">
                  <div className="form-check form-check-reverse">
                    <label className="form-check-label" htmlFor="radio4">$30</label>
                    <input className="form-check-input" type="radio" name="exampleRadio" id="radio4" defaultValue="option2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#/checkout" className="btn theme-btn w-100 shipping">apply</a>
      </div>
    </section>
    </>
  );
};

export default Shipping;
