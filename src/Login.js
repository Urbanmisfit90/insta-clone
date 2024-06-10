import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to handle login (check credentials locally for now)
    console.log('Login attempt:', username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login