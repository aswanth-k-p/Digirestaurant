import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../utils/api';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [restaurant, setRestaurant] = useState(JSON.parse(localStorage.getItem('restaurant')) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (restaurant) {
        localStorage.setItem('restaurant', JSON.stringify(restaurant));
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('restaurant');
    }
  }, [token, restaurant]);

  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/api/auth/register', formData);
      if (response.data.success) {
        setToken(response.data.token);
        setRestaurant(response.data.restaurant);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/api/auth/login', formData);
      if (response.data.success) {
        setToken(response.data.token);
        setRestaurant(response.data.restaurant);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setRestaurant(null);
  };

  const getProfile = async () => {
    try {
      const response = await api.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setRestaurant(response.data.restaurant);
      }
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      }
      throw err;
    }
  };

  const value = {
    token,
    restaurant,
    loading,
    error,
    register,
    login,
    logout,
    getProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
