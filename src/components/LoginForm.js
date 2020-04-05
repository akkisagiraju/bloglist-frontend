import React from 'react';

const LoginForm = ({
  username,
  password,
  setPassword,
  setUsername,
  onLogin,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={onLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
