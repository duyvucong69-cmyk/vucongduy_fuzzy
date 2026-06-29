const NewCard = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/payment">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Add New Card</h3>
        </div>
      </div>
    </header>
    

    
    <section className="section-b-space">
      <div className="custom-container">
        <form className="address-form" target="_blank">
          <div className="form-group">
            <label className="form-label">Card Number</label>
            <div className="form-input mb-3">
              <input type="text" className="form-control" placeholder="Enter card number" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Card Holder Name</label>
            <div className="form-input mb-3">
              <input type="text" className="form-control" placeholder="Enter card holder name" />
            </div>
          </div>

          <div className="row">
            <div className="col-5">
              <div className="form-group">
                <label className="form-label">CVV</label>
                <div className="form-input mb-3"><input type="password" className="form-control" placeholder="Enter cvv" /></div>
              </div>
            </div>
            <div className="col-7">
              <div className="form-group">
                <label className="form-label">Exp. Date</label>
                <div className="form-input mb-3">
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <a href="#/payment" className="btn theme-btn mt-5 w-100">Add Card</a>
        </form>
      </div>
    </section>
    </>
  );
};

export default NewCard;
