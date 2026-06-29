import { useState } from 'react';
import { apiFetch, saveToken, saveUser } from '../utils/auth';

const CreateAccount = () => {
  const [fullName, setFullName] = useState('');
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
    if (!fullName.trim()) {
      setError('Full name is required.');
      setLoading(false);
      return;
    }

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
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email,
          password,
          phone: '',
          birthday: '',
          avatar: ''
        }),
      });

      // Save credentials & login immediately
      saveToken(data.token);
      saveUser(data.user);

      // Redirect to landing dashboard
      window.location.hash = '#/landing';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Try again.');
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
            <h2>Let’s you in</h2>
            <h4 className="p-0">Hey, You have been missed!</h4>
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
            <label htmlFor="inputusername" className="form-label">Full Name</label>
            <div className="form-input mb-4">
              <input
                type="text"
                className="form-control"
                id="inputusername"
                placeholder="Enter Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <i className="iconsax icons" data-icon="user-1"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputemail" className="form-label">Email ID</label>
            <div className="form-input mb-4">
              <input
                type="email"
                className="form-control"
                id="inputemail"
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

          <div className="submit-btn" style={{ marginTop: '20px' }}>
            <button type="submit" className="btn auth-btn w-100" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          <div className="division">
            <span>OR</span>
          </div>

          <h4 className="signup pt-0">Already have an account ?<a href="#/login"> Sign in</a></h4>
        </div>
      </form>
    </>
  );
};

export default CreateAccount;
