import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email,
        password
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      const userData = await fetchUser(access_token);
      setUser(userData);
      setError(null);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const fetchUser = async (token) => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setError('Failed to fetch user information.');
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token).then(setUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
