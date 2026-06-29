const EmptyCart = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/landing">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>My Cart</h3>
        </div>
      </div>
    </header>
    

    
    <div className="custom-container">
      <div className="empty-tab">
        <img className="img-fluid empty-img w-100" src="images/gif/cart.gif" alt="empty-cart" />

        <h2>Your luggage is empty.</h2>
        <h5 className="mt-3">Check out our top products to get the right one for you.</h5>

        <a href="#/landing" className="btn theme-btn w-100 mt-3 mb-3" role="button">Start Shopping</a>
      </div>
    </div>
    </>
  );
};

export default EmptyCart;
