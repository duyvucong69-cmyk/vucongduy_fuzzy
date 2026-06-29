const OrderDetails = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/categories">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Order Details</h3>
        </div>
      </div>
    </header>
    

    
    <section className="section-t-space">
      <div className="custom-container">
        <div className="row g-3">
          <div className="col-12">
            <div className="order-product-box">
              <div className="horizontal-product-box pb-0">
                <a href="#" className="horizontal-product-img">
                  <img className="img-fluid img" src="images/product/3.png" alt="p3" />
                </a>
                <div className="horizontal-product-details">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h4>Wingback Chair</h4>
                    <h3 className="fw-semibold">$112</h3>
                  </div>
                  <h5>Qty:1</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-t-space">
      <div className="custom-container">
        <div className="order-tracking mt-0">
          <h2 className="mb-3">Order Journey</h2>
          <ul>
            <li className="order-process completed">
              <div className="d-flex gap-3 w-100">
                <span>
                  <img className="process-icon" src="images/svg/chack.svg" alt="check" />
                </span>
                <div className="process-details">
                  <h4>Order Information Received</h4>
                  <h5>5:30 pm | 25 Nov, 2022</h5>
                </div>
              </div>
            </li>
            <li className="order-process completed">
              <div className="d-flex gap-3 w-100">
                <span>
                  <img className="process-icon" src="images/svg/chack.svg" alt="check" />
                </span>
                <div className="process-details">
                  <h4>The Parcel is being collected</h4>
                  <h5>8:00 am | 28 Nov, 2022</h5>
                </div>
              </div>
            </li>
            <li className="order-process completed">
              <div className="d-flex gap-3 w-100">
                <span>
                  <img className="process-icon" src="images/svg/chack.svg" alt="check" />
                </span>
                <div className="process-details">
                  <h4>Ready To be Send</h4>
                  <h5>9:45 am | 29 Nov, 2022</h5>
                </div>
              </div>
            </li>
            <li className="order-process completed">
              <div className="d-flex gap-3 w-100">
                <span>
                  <img className="process-icon" src="images/svg/chack.svg" alt="check" />
                </span>
                <div className="process-details">
                  <h4>Dispatch in Local Wear House</h4>
                  <h5>2:20 pm | 30 Nov, 2022</h5>
                </div>
              </div>
            </li>
            <li className="order-process completed">
              <div className="d-flex gap-3 w-100">
                <span>
                  <img className="process-icon" src="images/svg/chack.svg" alt="check" />
                </span>
                <div className="process-details">
                  <h4>Parcel Delivered</h4>
                  <h5>5:30 pm | 01 Dec, 2022</h5>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    

    
    <section className="bill-details section-b-space">
      <div className="custom-container">
        <div className="total-detail">
          <div className="sub-total d-flex justify-content-between">
            <h5 className="light-text">Sub Total</h5>
            <h4 className="fw-medium">$112</h4>
          </div>
          <div className="sub-total mt-3 d-flex justify-content-between">
            <h5 className="light-text">Shipping charge</h5>
            <h4 className="fw-medium">$20.00</h4>
          </div>
          <div className="sub-total mt-3 mb-3 d-flex justify-content-between">
            <h5 className="fw-medium light-text">Discount (10%)</h5>
            <h4 className="fw-medium">$0.00</h4>
          </div>
          <div className="grand-total pt-3 d-flex justify-content-between">
            <h5 className="fw-medium">Grand Total</h5>
            <h4 className="fw-semibold amount">$132</h4>
          </div>
        </div>
        <a href="#/landing" className="btn gray-btn invoice-btn w-100">Download Invoice</a>
      </div>
    </section>
    </>
  );
};

export default OrderDetails;
