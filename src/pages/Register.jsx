import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeftIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import medicalIconsImage from '../assets/medical-icons.jpg';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const floatIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function Register() {
  const [userType, setUserType] = useState('patient');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  
  // Get auth context
  const { currentUser, userType: loggedInUserType } = useAuth();

  // Set up dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate(loggedInUserType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
    }
  }, [currentUser, loggedInUserType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Basic validation
    if (!name.trim()) {
      setFormError('Name is required');
      return;
    }
    
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password) {
      setFormError('Password is required');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    // In a real app, this would call an API to register the user
    // For now, show a success message and redirect to login
    alert(`Registration successful! Please login with your credentials.`);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-blue-50'} transition-colors duration-300`}>
      {/* Theme toggle button - positioned at top right */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-opacity-20 backdrop-blur-sm z-50 transition-colors duration-200 hover:bg-opacity-30"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-300" />
        ) : (
          <MoonIcon className="h-6 w-6 text-blue-800" />
        )}
      </button>
      
      {/* Back button */}
      <Link
        to="/"
        className="fixed top-4 left-4 p-2 rounded-full bg-opacity-20 backdrop-blur-sm z-50 transition-colors duration-200 hover:bg-opacity-30"
      >
        <ArrowLeftIcon className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-blue-800'}`} />
      </Link>
      
      {/* Left side - Medical Icons Image with animated icons */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${medicalIconsImage})` }}
        >
          {/* Overlay for better text readability */}
          <div className={`absolute inset-0 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-500/30'}`}></div>
        </div>
        
        {/* Text overlay on the image */}
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl font-bold mb-6 text-center"
          >
            Join Our Healthcare Platform
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-md text-center"
          >
            Create an account to access personalized healthcare services and connect with professionals.
          </motion.p>
        </div>
      </div>
      
      {/* Right side - Registration Form */}
      <div className={`w-full md:w-1/2 flex items-center justify-center p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`max-w-md w-full space-y-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          <div>
            <h2 className="text-center text-3xl font-extrabold">
              Create Your Account
            </h2>
            <p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Register as a patient or healthcare provider
            </p>
          </div>

          {/* Toggle between Doctor and Patient */}
          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserType('doctor')}
              className={`px-6 py-3 rounded-full transition-colors duration-200 font-medium ${
                userType === 'doctor'
                  ? darkMode 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-blue-500 text-white shadow-md'
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              Doctor
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserType('patient')}
              className={`px-6 py-3 rounded-full transition-colors duration-200 font-medium ${
                userType === 'patient'
                  ? darkMode 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30' 
                    : 'bg-teal-500 text-white shadow-md'
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              Patient
            </motion.button>
          </div>

          {/* Error messages */}
          {formError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-md text-red-500 ${
                darkMode 
                  ? 'bg-red-900/20 border border-red-800' 
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {formError}
            </motion.div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`appearance-none relative block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium mb-1">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none relative block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              {userType === 'doctor' && (
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium mb-1">
                    Medical Specialty
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    className={`appearance-none relative block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-colors ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select specialty</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="psychiatry">Psychiatry</option>
                    <option value="general">General Practice</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                  userType === 'doctor'
                    ? darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                    : darkMode 
                      ? 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500' 
                      : 'bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500'
                }`}
              >
                Register
              </motion.button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <Link to="/login" className={`font-medium transition-colors ${
                darkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-500'
              }`}>
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 