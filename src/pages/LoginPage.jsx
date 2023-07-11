import React, { useState } from 'react';
import { authenticate } from '../components/login.js';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isAuthenticated = await authenticate(username, password);

    if (isAuthenticated) {
      sessionStorage.setItem('username', username);
      console.log('Authentication successful');
      handleLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div id="loginpage">
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
