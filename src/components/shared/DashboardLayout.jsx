import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

export default function DashboardLayout({ 
  children, 
  navigation, 
  dashboardType,
  notificationCount = 3 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Toggle dark/light mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sample notifications
  const notifications = [
    { id: 1, text: 'Your appointment with Dr. Smith has been confirmed', time: '10 min ago', read: false },
    { id: 2, text: 'New lab results are available for review', time: '1 hour ago', read: false },
    { id: 3, text: 'Reminder: Take your medication at 8 PM', time: '2 hours ago', read: false },
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ 
          x: sidebarOpen ? 0 : -300,
          transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 30 
          } 
        }}
        className={`fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto 
          dark:bg-medical-blue-900 bg-white shadow-lg md:relative md:flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between flex-shrink-0 px-4 py-5 border-b dark:border-medical-blue-800 border-gray-200">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r dark:from-medical-teal-400 dark:to-medical-blue-500 from-medical-blue-600 to-medical-teal-500">
                MediChain
              </span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 rounded-full dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-medical-blue-800"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* User info */}
          {currentUser && (
            <div className="px-4 py-4 mb-4 mt-4 dark:bg-medical-blue-800/40 bg-blue-50 mx-3 rounded-lg">
              <p className="text-sm font-semibold dark:text-white text-gray-700">{currentUser.name}</p>
              <p className="text-xs dark:text-gray-400 text-gray-500">{dashboardType} Account</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r dark:from-medical-teal-400 dark:to-medical-blue-500 from-medical-blue-600 to-medical-teal-500 rounded-full"></div>
            </div>
          )}

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto font-medium">
            {navigation.map((item) => {
              const isActive = 
                location.pathname === `/${dashboardType.toLowerCase()}-dashboard/${item.path}` || 
                (location.pathname === `/${dashboardType.toLowerCase()}-dashboard` && item.path === '');
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'dark:bg-medical-blue-800 bg-blue-100 dark:text-white text-blue-800 font-semibold'
                      : 'dark:text-gray-300 text-gray-700 hover:dark:bg-medical-blue-800/50 hover:bg-blue-50'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? 'dark:text-medical-teal-400 text-blue-600'
                        : 'dark:text-gray-400 text-gray-500'
                    }`}
                  />
                  {item.name}
                  
                  {/* Show indicator for items with notifications */}
                  {(item.name === 'Notifications' || item.name === 'Messages') && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full dark:bg-medical-teal-500 bg-blue-500 text-xs text-white">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 
                dark:text-gray-300 text-gray-700 hover:dark:bg-medical-blue-800/50 hover:bg-blue-50 mt-6"
            >
              <svg className="mr-3 h-5 w-5 dark:text-gray-400 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 16L21 12M21 12L17 8M21 12H9M9 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2H9" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          </nav>
          
          <div className="p-4 dark:border-t dark:border-medical-blue-800 border-t border-gray-200">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-full px-4 py-2 rounded-lg
                dark:bg-medical-blue-800 bg-blue-50 dark:text-white text-gray-700 transition-colors"
            >
              {darkMode ? (
                <SunIcon className="h-4 w-4 mr-2 text-yellow-400" />
              ) : (
                <MoonIcon className="h-4 w-4 mr-2 text-blue-500" />
              )}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <div className="dark:bg-medical-blue-800 bg-white shadow-sm z-10 dark:border-b dark:border-medical-blue-700 border-b border-gray-200">
          <div className="px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md dark:text-gray-300 text-gray-600 hover:dark:bg-medical-blue-700 hover:bg-gray-100"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div className="ml-4 md:ml-0">
                <h1 className="text-lg font-semibold dark:text-white text-gray-800">
                  Welcome back, {currentUser?.name?.split(' ')[0]}
                </h1>
                <p className="text-xs dark:text-gray-400 text-gray-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 dark:text-gray-400 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border dark:border-medical-blue-600 border-gray-300 rounded-md 
                    dark:bg-medical-blue-700 bg-gray-100 dark:text-gray-300 text-gray-800 
                    placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-medical-blue-500 dark:focus:ring-offset-medical-blue-800 
                    focus:ring-offset-white text-sm"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full dark:text-gray-300 text-gray-600 
                    hover:dark:bg-medical-blue-700 hover:bg-gray-100 relative"
                >
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notification dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 w-80 mt-2 py-2 dark:bg-medical-blue-800 bg-white rounded-lg shadow-xl z-20 
                    dark:border dark:border-medical-blue-700 border border-gray-200">
                    <div className="px-4 py-2 dark:border-b dark:border-medical-blue-700 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-sm font-semibold dark:text-white text-gray-800">Notifications</h2>
                      <span className="text-xs px-2 py-1 dark:bg-medical-blue-700 bg-blue-100 rounded-full dark:text-medical-teal-400 text-blue-600">
                        {notificationCount} new
                      </span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:dark:bg-medical-blue-700 hover:bg-gray-50 
                            ${notification.read ? '' : 'dark:bg-medical-blue-700/40 bg-blue-50'} 
                            border-b dark:border-medical-blue-700 border-gray-100`}
                        >
                          <p className="text-sm dark:text-white text-gray-800">{notification.text}</p>
                          <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 text-center dark:border-t dark:border-medical-blue-700 border-t border-gray-200">
                      <button className="text-sm dark:text-medical-teal-400 text-blue-600 hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark/Light mode toggle for mobile */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full dark:text-gray-300 text-gray-600 
                  hover:dark:bg-medical-blue-700 hover:bg-gray-100 block sm:hidden"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-blue-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto dark:bg-medical-blue-900 bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 