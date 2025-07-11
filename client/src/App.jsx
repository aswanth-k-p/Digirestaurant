import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './contexts/useAuth';
import MenuViewer from './components/MenuViewer';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import './App.css'
import { AuthProvider } from './contexts/AuthProvider';



// import dotenv from 'dotenv';
// dotenv.config();


// Protected route component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {children}
    </>
  );
};


function App() {
  

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu/:restaurantId" element={<MenuViewer />} />
          <Route path="/dashboard" element={

            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>

          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
