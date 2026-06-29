const ManagePayment = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/profile">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Payment Options</h3>
        </div>
      </div>
    </header>
    

    
    <section className="payment-method section-lg-b-space">
      <div className="custom-container">
        <h2 className="fw-semibold theme-color">Your Card</h2>

        <ul className="payment-list section-lg-b-space">
          <li className="cart-add-box payment-card-box gap-0 mt-3">
            <div className="payment-detail border-bottom-0">
              <label className="form-label" htmlFor="one">
                <img className="img-fluid img" src="images/icons/svg/mastercard.svg" alt="mastercard" />
                <span>
                  <span className="fw-normal theme-color card-heading">Mastercard *** *** 4589</span>
                  <span className="fw-normal card-sub-heading">Expires on 16/24</span>
                </span>
              </label>
              <div className="form-check">
                <input id="one" className="form-check-input" type="radio" name="flexRadioDefault" defaultChecked={true} />
              </div>
            </div>
          </li>
          <li className="cart-add-box payment-card-box gap-0 mt-3">
            <div className="payment-detail border-bottom-0">
              <label className="form-label" htmlFor="two">
                <img className="img-fluid img" src="images/icons/svg/visa.svg" alt="visa" />
                <span>
                  <span className="fw-normal theme-color card-heading">visa *** *** 4589</span>
                  <span className="fw-normal card-sub-heading">Expires on 16/24</span>
                </span>
              </label>
              <div className="form-check">
                <input id="two" className="form-check-input" type="radio" name="flexRadioDefault" />
              </div>
            </div>
          </li>
        </ul>

        <div className="new-card">
          <a href="#/new-card">
            <h6>+Add New Card</h6>
          </a>
        </div>

        <h2 className="fw-semibold theme-color section-t-space">Wallet</h2>
        <div className="payment-list">
          <ul className="cart-add-box payment-card-box gap-0 mt-3">
            <li className="w-100">
              <div className="payment-detail">
                <label className="form-label" htmlFor="three">
                  <img className="img-fluid img" src="images/icons/svg/paypal.svg" alt="mastercard" />
                  <span>
                    <span className="fw-normal theme-color">Pay Pal</span>
                  </span>
                </label>
                <div className="form-check">
                  <input className="form-check-input" id="three" type="radio" name="flexRadioDefault" />
                </div>
              </div>
            </li>
            <li className="w-100">
              <div className="payment-detail">
                <label className="form-label" htmlFor="four">
                  <img className="img-fluid img1" src="images/icons/svg/apple-pay.svg" alt="apple-pay" />
                  <span>
                    <span className="fw-normal theme-color">Apple Pay</span>
                  </span>
                </label>
                <div className="form-check">
                  <input className="form-check-input" id="four" type="radio" name="flexRadioDefault" />
                </div>
              </div>
            </li>
            <li className="w-100">
              <div className="payment-detail">
                <label className="form-label" htmlFor="five">
                  <img className="img-fluid img" src="images/icons/svg/google-pay.svg" alt="google-pay" />
                  <span>
                    <span className="fw-normal theme-color">Google Pay</span>
                  </span>
                </label>
                <div className="form-check">
                  <input className="form-check-input" id="five" type="radio" name="flexRadioDefault" />
                </div>
              </div>
            </li>
            <li className="w-100">
              <div className="payment-detail border-bottom-0">
                <label className="form-label" htmlFor="six">
                  <img className="img-fluid img" src="images/icons/svg/cash.svg" alt="cash" />
                  <span>
                    <span className="fw-normal theme-color">Cash on Delivery</span>
                  </span>
                </label>
                <div className="form-check">
                  <input className="form-check-input" id="six" type="radio" name="flexRadioDefault" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </>
  );
};

export default ManagePayment;
