const Setting = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/profile">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Setting</h3>
        </div>
      </div>
    </header>
    

    
    <section>
      <div className="custom-container">
        <ul className="notification-setting">
          <li>
            <div className="notification pt-0">
              <h5 className="fw-semibold theme-color">Dark/Light</h5>
              <div className="switch-btn">
                <input id="dark-switch" type="checkbox" />
              </div>
            </div>
          </li>

          <li>
            <div className="notification">
              <h5 className="fw-semibold theme-color">RTL</h5>
              <div className="switch-btn">
                <input id="dir-switch" type="checkbox" />
              </div>
            </div>
          </li>

          <li>
            <div className="notification pb-0">
              <h5 className="fw-semibold theme-color">Notification</h5>
              <div className="switch-btn">
                <input type="checkbox" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    

    
    <section className="panel-space"></section>
    </>
  );
};

export default Setting;
