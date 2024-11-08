import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="card">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginBottom: '1rem',
              objectFit: 'cover'
            }}
          />
        )}
        <h1>Welcome, {user?.name}!</h1>
        <p>Email: {user?.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
