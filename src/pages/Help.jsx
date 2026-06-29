const Help = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/profile">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Help Center</h3>
        </div>
      </div>
    </header>
    

    
    <section className="section-b-space">
      <div className="custom-container">
        <div className="help-center">
          <img className="img-fluid help-pic" src="images/banner/help-pic.png" alt="help" />
          <h2>Help Center</h2>
          <p>Please get in touch and we will be happy to help you. Get quick customer support by selecting your item</p>

          <h3>What issues are you facing?</h3>
          <div className="accordion accordion-flush help-accordion" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false">I want to track my order</button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">To track your order, you will need to have the tracking number or order ID provided by the seller or shipping carrier. Once you have this information, you can usually track your order online by visiting the carrier's website and entering the tracking number or order ID in the designated tracking field.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">I want to manage my order</button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <ul>
                    <li>Check your order confirmation email or account: This should contain information about your order, including the expected delivery date, tracking number (if applicable), and contact information for the seller.</li>
                    <li>Contact the seller: If you have any questions about your order or need to make changes, the best way to do so is to contact the seller directly. You can typically find their contact information on their website or in your order confirmation email.</li>
                    <li>Check the order status: Many online retailers provide a way for you to check the status of your order online. This can give you information about when your order was shipped, when it's expected to arrive, and any tracking information.</li>
                    <li>Make changes to your order: Depending on the seller's policies, you may be able to make changes to your order, such as adding or removing items, changing the shipping address, or canceling the order altogether. Contact the seller to see if this is possible.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">I did not receive Instant Cashback</button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  I'm sorry to hear that you did not receive an instant cashback. To help you with this issue, I need more information.
                  <ul>
                    <li>What type of purchase did you make?</li>
                    <li>From which website or store did you make the purchase?</li>
                    <li>Did you receive any confirmation or receipt for your purchase?</li>
                    <li>Did you check the terms and conditions of the cashback offer before making the purchase?</li>
                    <li>What type of purchase did you make?Have you contacted the website or store's customer support regarding the issue?</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">I am unable to pay using wallet</button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  I'm sorry to hear that you did not receive an instant cashback. To help you with this issue, I need more information.
                  <ul>
                    <li>What type of purchase did you make?</li>
                    <li>From which website or store did you make the purchase?</li>
                    <li>Did you receive any confirmation or receipt for your purchase?</li>
                    <li>Did you check the terms and conditions of the cashback offer before making the purchase?</li>
                    <li>What type of purchase did you make?Have you contacted the website or store's customer support regarding the issue?</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">I want help with returns & refunds</button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  I'm sorry to hear that you did not receive an instant cashback. To help you with this issue, I need more information.
                  <ul>
                    <li>What type of purchase did you make?</li>
                    <li>From which website or store did you make the purchase?</li>
                    <li>Did you receive any confirmation or receipt for your purchase?</li>
                    <li>Did you check the terms and conditions of the cashback offer before making the purchase?</li>
                    <li>What type of purchase did you make?Have you contacted the website or store's customer support regarding the issue?</li>
                  </ul>
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

export default Help;
