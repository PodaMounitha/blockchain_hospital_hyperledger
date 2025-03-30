import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Mock user data
const mockUsers = {
  doctors: [
    { id: 1, email: 'doctor@example.com', password: 'password123', name: 'Dr. John Smith' },
    { id: 2, email: 'doctor2@example.com', password: 'password123', name: 'Dr. Sarah Johnson' }
  ],
  patients: [
    { id: 1, email: 'patient@example.com', password: 'password123', name: 'Alex Thompson' },
    { id: 2, email: 'patient2@example.com', password: 'password123', name: 'Emily Wilson' }
  ]
};

export const AuthProvider = ({ children }) => {
  // Get stored auth data from localStorage or set initial state
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || '';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update localStorage when auth state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userType');
    }
  }, [currentUser, userType]);

  // Login function
  const login = async (email, password, type) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = type === 'doctor' ? mockUsers.doctors : mockUsers.patients;
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Create a sanitized user object (no password)
        const safeUser = { ...user };
        delete safeUser.password;
        
        setCurrentUser(safeUser);
        setUserType(type);
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setUserType('');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
  };

  // Context value
  const value = {
    currentUser,
    userType,
    loading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 