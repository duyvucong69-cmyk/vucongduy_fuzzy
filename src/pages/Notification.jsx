const Notification = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/landing">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Notification</h3>
        </div>
      </div>
    </header>
    

    
    <section>
      <div className="custom-container">
        <div className="row g-3">
          <div className="col-12">
            <div className="notification-product-box">
              <a href="#" className="notification-product-img">
                <img className="img-fluid notification-icons" src="images/svg/discount.svg" alt="discount" />
              </a>
              <div className="notification-product-details notification-details">
                <div className="w-100">
                  <h4>30% Special Discount!</h4>
                  <h5>Special promotion only valid today</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="notification-product-box">
              <a href="#" className="notification-product-img notification-img">
                <img className="img-fluid notification-icons" src="images/svg/wallet.svg" alt="wallet" />
              </a>
              <div className="notification-product-details notification-details">
                <div className="w-100">
                  <h4>Top up E-wallet successful</h4>
                  <h5>You have to top up your wallet</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="notification-product-box">
              <a href="#" className="notification-product-img notification-img">
                <img className="img-fluid notification-icons" src="images/svg/location.svg" alt="location" />
              </a>
              <div className="notification-product-details notification-details">
                <div className="w-100">
                  <h4>New service Available</h4>
                  <h5>Now you can track orders</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="notification-product-box">
              <a href="#" className="notification-product-img notification-img">
                <img className="img-fluid notification-icons" src="images/svg/card.svg" alt="card" />
              </a>
              <div className="notification-product-details notification-details">
                <div className="w-100">
                  <h4>Credit card connected!</h4>
                  <h5>Credit card has been linked!</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="notification-product-box">
              <a href="#" className="notification-product-img notification-img">
                <img className="img-fluid notification-icons" src="images/svg/profile-fill.svg" alt="profile" />
              </a>
              <div className="notification-product-details notification-details">
                <div className="w-100">
                  <h4>Account setup successful!</h4>
                  <h5>Your account has been created!</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Notification;
