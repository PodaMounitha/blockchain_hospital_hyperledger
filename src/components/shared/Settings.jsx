import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../PageHeader';
import { 
  UserCircleIcon, 
  BellIcon, 
  LockClosedIcon, 
  ShieldCheckIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

export default function Settings({ userType, userId }) {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: LockClosedIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'devices', name: 'Devices', icon: DevicePhoneMobileIcon },
  ];
  
  return (
    <div>
      <PageHeader 
        title="Settings" 
        description="Manage your account settings and preferences"
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="w-full md:w-1/4">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <nav className="space-y-1 p-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <tab.icon
                    className={`mr-3 h-5 w-5 ${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-gray-800 rounded-lg p-6">
            {activeTab === 'profile' && (
              <ProfileSettings currentUser={currentUser} userType={userType} />
            )}
            
            {activeTab === 'notifications' && (
              <NotificationSettings />
            )}
            
            {activeTab === 'security' && (
              <SecuritySettings />
            )}
            
            {activeTab === 'privacy' && (
              <PrivacySettings userType={userType} />
            )}
            
            {activeTab === 'devices' && (
              <DevicesSettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ currentUser, userType }) {
  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-6">Profile Settings</h2>
      
      <div className="flex flex-col items-center mb-6 sm:flex-row sm:items-start">
        <div className="flex-shrink-0 h-24 w-24 rounded-full bg-gray-600 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
          <span className="text-3xl font-medium text-white">{currentUser?.name?.charAt(0) || 'U'}</span>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white">{currentUser?.name || 'User'}</h3>
          <p className="text-gray-400">{currentUser?.email || 'user@example.com'}</p>
          <div className="mt-2 flex space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
              Change Photo
            </button>
            <button className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue={currentUser?.name}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue={currentUser?.email}
            />
          </div>
          
          {userType === 'doctor' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Specialty
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="Cardiology"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  License Number
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="MD12345678"
                />
              </div>
            </>
          )}
          
          {userType === 'patient' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Date of Birth
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Emergency Contact
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Emergency Contact Phone
                </label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="(555) 987-6543"
                />
              </div>
            </>
          )}
        </div>
        
        <div className="pt-5 flex justify-end">
          <button
            type="button"
            className="mr-3 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Email Notifications</h3>
          <div className="space-y-3">
            {[
              { id: 'email-appointments', label: 'Appointment reminders' },
              { id: 'email-messages', label: 'New messages' },
              { id: 'email-records', label: 'Medical record updates' },
              { id: 'email-news', label: 'Healthcare news and tips' }
            ].map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  id={option.id}
                  type="checkbox"
                  defaultChecked={option.id !== 'email-news'}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={option.id} className="ml-2 block text-sm text-white">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Push Notifications</h3>
          <div className="space-y-3">
            {[
              { id: 'push-appointments', label: 'Appointment reminders' },
              { id: 'push-messages', label: 'New messages' },
              { id: 'push-records', label: 'Medical record updates' }
            ].map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  id={option.id}
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={option.id} className="ml-2 block text-sm text-white">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-5 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-6">Security Settings</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Change Password</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Current Password
              </label>
              <input 
                type="password" 
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your current password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                New Password
              </label>
              <input 
                type="password" 
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Confirm New Password
              </label>
              <input 
                type="password" 
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Two-Factor Authentication</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Protect your account with two-factor authentication</p>
                <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account</p>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Enable
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Login History</h3>
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-600">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm">Chrome on Windows</p>
                  <p className="text-xs text-gray-400">Current session</p>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">
                  Active Now
                </span>
              </div>
            </div>
            <div className="px-4 py-3 border-b border-gray-600">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm">Safari on iPhone</p>
                  <p className="text-xs text-gray-400">May 10, 2023 at 3:42 PM</p>
                </div>
                <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm">Firefox on MacOS</p>
                  <p className="text-xs text-gray-400">May 8, 2023 at 11:15 AM</p>
                </div>
                <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacySettings({ userType }) {
  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-6">Privacy Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Data Sharing</h3>
          <div className="space-y-3">
            {userType === 'patient' ? (
              // Patient privacy options
              [
                { id: 'share-doctors', label: 'Share my data with my healthcare providers' },
                { id: 'share-insurance', label: 'Share my data with my insurance provider' },
                { id: 'share-research', label: 'Allow my anonymized data to be used for research' },
                { id: 'share-emergency', label: 'Share my data in case of emergency' }
              ].map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={option.id}
                    type="checkbox"
                    defaultChecked={option.id !== 'share-research'}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={option.id} className="ml-2 block text-sm text-white">
                    {option.label}
                  </label>
                </div>
              ))
            ) : (
              // Doctor privacy options
              [
                { id: 'share-profile', label: 'Share my profile with patients' },
                { id: 'share-specialty', label: 'Make my specialty public' },
                { id: 'share-availability', label: 'Show my availability to patients' }
              ].map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={option.id}
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={option.id} className="ml-2 block text-sm text-white">
                    {option.label}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
        
        {userType === 'patient' && (
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Access Control</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-white mb-3">Manage which healthcare providers can access your medical records</p>
              
              <div className="space-y-3">
                {[
                  { id: 1, name: 'Dr. John Smith', specialty: 'Cardiology', access: true },
                  { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Neurology', access: true },
                  { id: 3, name: 'Dr. Michael Brown', specialty: 'Pediatrics', access: false }
                ].map(doctor => (
                  <div key={doctor.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">{doctor.name}</p>
                      <p className="text-xs text-gray-400">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id={`doctor-access-${doctor.id}`}
                        type="checkbox"
                        defaultChecked={doctor.access}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`doctor-access-${doctor.id}`} className="ml-2 block text-sm text-white">
                        Allow Access
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-5 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
}

function DevicesSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-6">Connected Devices</h2>
      
      <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-gray-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                <DevicePhoneMobileIcon className="h-6 w-6 text-gray-300" />
              </div>
              <div>
                <p className="text-white text-sm">iPhone 13</p>
                <p className="text-xs text-gray-400">Connected on May 1, 2023</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                Rename
              </button>
              <button className="text-xs text-red-500 hover:text-red-400 transition-colors">
                Disconnect
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm">Apple Watch Series 7</p>
                <p className="text-xs text-gray-400">Connected on April 15, 2023</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                Rename
              </button>
              <button className="text-xs text-red-500 hover:text-red-400 transition-colors">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="button"
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Connect New Device
        </button>
      </div>
    </div>
  );
} 