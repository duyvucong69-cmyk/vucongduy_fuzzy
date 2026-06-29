const OtherSetting = () => {
  return (
    <div className="section-b-space" style={{ padding: '40px 20px', color: '#fff', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="theme-logo pb-3">
        <img className="img-fluid logo-img" src="images/logo/logo.png" alt="logo" style={{ maxWidth: '150px' }} />
      </div>
      <h2 style={{ fontSize: '2rem', margin: '20px 0 10px', color: '#ffb300' }}>OtherSetting Page</h2>
      <p style={{ color: '#999', marginBottom: '30px', maxWidth: '400px' }}>
        This page is under construction or was not available in the original template.
      </p>
      <a href="#/landing" className="btn theme-btn" style={{ background: '#122636', color: '#fff', padding: '10px 30px', borderRadius: '5px', textDecoration: 'none', border: '1px solid #ffb300' }}>
        Back to Dashboard
      </a>
    </div>
  );
};

export default OtherSetting;
