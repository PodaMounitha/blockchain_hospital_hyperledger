import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

// Import custom components
import Patients from '../components/doctor/Patients';
import Appointments from '../components/shared/Appointments';
import MedicalRecords from '../components/shared/MedicalRecords';
import Messages from '../components/shared/Messages';
import Notifications from '../components/shared/Notifications';
import Settings from '../components/shared/Settings';
import Analytics from '../components/shared/Analytics';
import DashboardLayout from '../components/shared/DashboardLayout';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '' },
  { name: 'Patients', icon: UserGroupIcon, path: 'patients' },
  { name: 'Appointments', icon: CalendarIcon, path: 'appointments' },
  { name: 'Medical Records', icon: DocumentTextIcon, path: 'records' },
  { name: 'Notifications', icon: BellIcon, path: 'notifications' },
  { name: 'Messages', icon: ChatBubbleLeftRightIcon, path: 'messages' },
  { name: 'Analytics', icon: ChartBarIcon, path: 'analytics' },
  { name: 'Settings', icon: Cog6ToothIcon, path: 'settings' },
];

export default function DoctorDashboard() {
  return (
    <DashboardLayout navigation={navigation} dashboardType="Doctor">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/records" element={<MedicalRecords />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}

function DashboardHome() {
  const { currentUser } = useAuth();
  
  // Quick stats data
  const stats = [
    { name: 'Total Patients', value: '248', icon: UserGroupIcon, color: 'medical-blue' },
    { name: 'Today\'s Appointments', value: '12', icon: CalendarIcon, color: 'medical-teal' },
    { name: 'Pending Reports', value: '6', icon: DocumentTextIcon, color: 'medical-green' },
    { name: 'Messages', value: '18', icon: ChatBubbleLeftRightIcon, color: 'blue' },
  ];
  
  // Upcoming appointments
  const appointments = [
    { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', type: 'Check-up', status: 'confirmed' },
    { id: 2, patient: 'Michael Chen', time: '10:30 AM', type: 'Follow-up', status: 'confirmed' },
    { id: 3, patient: 'Emily Wilson', time: '01:15 PM', type: 'Consultation', status: 'pending' },
    { id: 4, patient: 'Robert Davis', time: '03:45 PM', type: 'Test Review', status: 'confirmed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-5 dark:text-white text-gray-800">Doctor Dashboard</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="dark:bg-medical-blue-800 bg-white overflow-hidden rounded-lg shadow dark:shadow-medical-blue-800/30"
            >
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium truncate dark:text-gray-300 text-gray-500">
                    {stat.name}
                  </p>
                  <p className="mt-1 text-3xl font-semibold dark:text-white text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`flex-shrink-0 rounded-md p-3 dark:bg-${stat.color}-500/20 bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 dark:text-${stat.color}-400 text-${stat.color}-600`} />
                </div>
              </div>
              <div className={`bg-gradient-to-r dark:from-${stat.color}-500 dark:to-${stat.color}-400 from-${stat.color}-400 to-${stat.color}-300 w-full h-1`} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Appointments */}
        <div className="dark:bg-medical-blue-800 bg-white overflow-hidden rounded-lg shadow dark:shadow-medical-blue-800/30">
          <div className="p-4 flex items-center justify-between border-b dark:border-medical-blue-700 border-gray-200">
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Today's Appointments</h3>
            <a href="#" className="text-sm font-medium dark:text-medical-teal-400 text-blue-600 hover:underline">
              View all
            </a>
          </div>
          <div className="p-4">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-medical-blue-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-medical-blue-700">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium dark:text-white text-gray-900">{appointment.patient}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm dark:text-gray-300 text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm dark:text-gray-300 text-gray-500">{appointment.type}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'dark:bg-green-900/30 bg-green-100 dark:text-green-400 text-green-800' 
                            : 'dark:bg-yellow-900/30 bg-yellow-100 dark:text-yellow-400 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dark:bg-medical-blue-800 bg-white overflow-hidden rounded-lg shadow dark:shadow-medical-blue-800/30">
          <div className="p-4 flex items-center justify-between border-b dark:border-medical-blue-700 border-gray-200">
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Recent Activity</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              <li className="p-3 dark:bg-medical-blue-700/40 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-2 h-2 rounded-full dark:bg-medical-teal-400 bg-blue-600"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm dark:text-white text-gray-900">You updated Sarah Johnson's medical records</p>
                    <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">30 minutes ago</p>
                  </div>
                </div>
              </li>
              <li className="p-3 dark:bg-medical-blue-700/40 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-2 h-2 rounded-full dark:bg-medical-teal-400 bg-blue-600"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm dark:text-white text-gray-900">New lab results uploaded for Michael Chen</p>
                    <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              </li>
              <li className="p-3 dark:bg-medical-blue-700/40 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-2 h-2 rounded-full dark:bg-medical-teal-400 bg-blue-600"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm dark:text-white text-gray-900">You prescribed medication for Emily Wilson</p>
                    <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">Yesterday at 4:30 PM</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}