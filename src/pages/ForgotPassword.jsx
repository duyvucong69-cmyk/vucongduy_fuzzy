const ForgotPassword = () => {
  return (
    <>
      <div className="auth-img">
      <img className="img-fluid auth-bg" src="images/background/auth_bg.jpg" alt="auth_bg" />
      <div className="auth-content">
        <div>
          <h2>Forgot Password?</h2>
        </div>
      </div>
    </div>

    <form className="auth-form" target="_blank">
      <div className="custom-container">
        <div className="form-group">
          <label htmlFor="inputusername" className="form-label">Email id</label>
          <div className="form-input mb-4">
            <input type="text" className="form-control" id="inputusername" placeholder="Enter Your Email" />
            <i className="iconsax icons" data-icon="mail"></i>
          </div>
        </div>

        <div className="submit-btn">
          <a href="#/otp" className="btn auth-btn w-100">Send OTP</a>
        </div>
      </div>
    </form>
    </>
  );
};

export default ForgotPassword;
