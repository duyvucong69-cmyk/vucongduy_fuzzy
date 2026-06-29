import { useState } from 'react';
import { apiFetch, saveToken, saveUser } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email format is invalid.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Save credentials
      saveToken(data.token);
      saveUser(data.user);

      // Redirect to landing dashboard
      window.location.hash = '#/landing';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-img">
        <img className="img-fluid auth-bg" src="images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content">
          <div>
            <h2>Hello Again!</h2>
            <h4 className="p-0">Welcome back, You have been missed!</h4>
          </div>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger" role="alert" style={{ fontSize: '1.4rem', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="inputusername" className="form-label">Email ID</label>
            <div className="form-input mb-4">
              <input
                type="email"
                className="form-control"
                id="inputusername"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="iconsax icons" data-icon="mail"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <div className="form-input" style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="inputPassword"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '45px' }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  color: '#999',
                  zIndex: 10
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
              <i className="iconsax icons" data-icon="key"></i>
            </div>
          </div>
          
          <div className="option mt-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
            </div>
            <a className="forgot" href="#/forgot-password">Forgot password?</a>
          </div>

          <div className="submit-btn" style={{ marginTop: '20px' }}>
            <button type="submit" className="btn auth-btn w-100" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          
          <div className="division">
            <span>OR</span>
          </div>

          <ul className="social-media">
            <li>
              <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="images/svg/facebook.svg" alt="facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.google.co.in/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="images/svg/google.svg" alt="facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.apple.com/in/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="images/svg/apple.svg" alt="facebook" />
              </a>
            </li>
          </ul>

          <h4 className="signup">Don’t have an account ?<a href="#/create-account"> Sign up</a></h4>
        </div>
      </form>
    </>
  );
};

export default Login;
