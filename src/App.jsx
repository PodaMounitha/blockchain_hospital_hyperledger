import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ element, allowedType }) => {
  const { currentUser, userType } = useAuth();
  
  // Check if user is logged in and has correct type
  if (!currentUser || (allowedType && userType !== allowedType)) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
};

function App() {
  // Check for saved dark mode preference on load
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen dark:bg-medical-blue-900 bg-gray-50 dark:text-white text-gray-900">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/doctor-dashboard/*" 
              element={<ProtectedRoute element={<DoctorDashboard />} allowedType="doctor" />} 
            />
            <Route 
              path="/patient-dashboard/*" 
              element={<ProtectedRoute element={<PatientDashboard />} allowedType="patient" />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;