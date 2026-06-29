const ResetPassword = () => {
  return (
    <>
      <div className="auth-img">
      <img className="img-fluid auth-bg" src="images/background/auth_bg.jpg" alt="auth_bg" />
      <div className="auth-content">
        <div>
          <h2>Create a New Password</h2>
        </div>
      </div>
    </div>

    <form className="auth-form" target="_blank">
      <div className="custom-container">
        <div className="form-group">
          <label htmlFor="inputPassword1" className="form-label">Password</label>
          <div className="form-input">
            <input type="password" className="form-control" id="inputPassword1" placeholder="Enter New Password" />
            <i className="iconsax icons" data-icon="key"></i>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword2" className="form-label">Password</label>
          <div className="form-input">
            <input type="password" className="form-control" id="inputPassword2" placeholder="Enter Confirm Password" />
            <i className="iconsax icons" data-icon="key"></i>
          </div>
        </div>
        <a href="#/login" className="btn auth-btn w-100" role="button">Reset Password</a>
      </div>
    </form>
    </>
  );
};

export default ResetPassword;
