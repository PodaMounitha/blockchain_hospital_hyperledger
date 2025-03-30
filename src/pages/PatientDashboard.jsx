import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  CalendarIcon,
  DocumentTextIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BeakerIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

// Import components
import MedicalRecords from '../components/shared/MedicalRecords';
import Notifications from '../components/shared/Notifications';
import Messages from '../components/shared/Messages';
import Settings from '../components/shared/Settings';
import Analytics from '../components/shared/Analytics';
import Appointments from '../components/shared/Appointments';
import Prescriptions from '../components/patient/Prescriptions';
import HealthTracker from '../components/patient/HealthTracker';
import DashboardLayout from '../components/shared/DashboardLayout';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '' },
  { name: 'Appointments', icon: CalendarIcon, path: 'appointments' },
  { name: 'Medical Records', icon: DocumentTextIcon, path: 'records' },
  { name: 'Prescriptions', icon: BeakerIcon, path: 'prescriptions' },
  { name: 'Health Tracker', icon: HeartIcon, path: 'health-tracker' },
  { name: 'Notifications', icon: BellIcon, path: 'notifications' },
  { name: 'Messages', icon: ChatBubbleLeftRightIcon, path: 'messages' },
  { name: 'Analytics', icon: ChartBarIcon, path: 'analytics' },
  { name: 'Settings', icon: Cog6ToothIcon, path: 'settings' },
];

export default function PatientDashboard() {
  return (
    <DashboardLayout navigation={navigation} dashboardType="Patient">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/records" element={<MedicalRecords />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/health-tracker" element={<HealthTracker />} />
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
    { name: 'Upcoming Appointments', value: '2', icon: CalendarIcon, color: 'medical-teal' },
    { name: 'Prescriptions', value: '4', icon: BeakerIcon, color: 'medical-blue' },
    { name: 'Messages', value: '3', icon: ChatBubbleLeftRightIcon, color: 'medical-green' },
    { name: 'Health Score', value: '85', icon: HeartIcon, color: 'red' },
  ];

  // Upcoming appointments
  const appointments = [
    { id: 1, doctor: 'Dr. Johnson', specialty: 'Cardiology', date: 'Jun 15, 2023', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Williams', specialty: 'General', date: 'Jun 22, 2023', time: '2:30 PM' },
  ];

  // Recent prescriptions
  const prescriptions = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Every 8 hours', remaining: '6 days' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', remaining: '14 days' },
    { id: 3, name: 'Metformin', dosage: '850mg', frequency: 'Twice daily', remaining: '10 days' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-5 dark:text-white text-gray-800">Patient Dashboard</h2>
        
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
        {/* Upcoming Appointments */}
        <div className="dark:bg-medical-blue-800 bg-white overflow-hidden rounded-lg shadow dark:shadow-medical-blue-800/30">
          <div className="p-4 flex items-center justify-between border-b dark:border-medical-blue-700 border-gray-200">
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Upcoming Appointments</h3>
            <a href="#" className="text-sm font-medium dark:text-medical-teal-400 text-blue-600 hover:underline">
              Schedule New
            </a>
          </div>
          <div className="p-4">
            {appointments.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-medical-blue-700">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="py-3 flex justify-between">
                    <div>
                      <p className="text-sm font-medium dark:text-white text-gray-900">{appointment.doctor}</p>
                      <p className="text-xs dark:text-gray-400 text-gray-500">{appointment.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm dark:text-medical-teal-400 text-blue-600">{appointment.date}</p>
                      <p className="text-xs dark:text-gray-400 text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 dark:text-gray-400 text-gray-500">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Current Prescriptions */}
        <div className="dark:bg-medical-blue-800 bg-white overflow-hidden rounded-lg shadow dark:shadow-medical-blue-800/30">
          <div className="p-4 flex items-center justify-between border-b dark:border-medical-blue-700 border-gray-200">
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Current Prescriptions</h3>
            <a href="#" className="text-sm font-medium dark:text-medical-teal-400 text-blue-600 hover:underline">
              View All
            </a>
          </div>
          <div className="p-4">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-medical-blue-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Medication
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Dosage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider">
                      Remaining
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-medical-blue-700">
                  {prescriptions.map((prescription) => (
                    <tr key={prescription.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium dark:text-white text-gray-900">{prescription.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm dark:text-gray-300 text-gray-500">{prescription.dosage}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm dark:text-gray-300 text-gray-500">{prescription.frequency}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full dark:bg-medical-blue-700/50 bg-blue-100 dark:text-medical-teal-400 text-blue-600">
                          {prescription.remaining}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="dark:bg-medical-blue-800 bg-white overflow-hidden rounded-lg shadow dark:shadow-medical-blue-800/30">
        <div className="p-4 flex items-center justify-between border-b dark:border-medical-blue-700 border-gray-200">
          <h3 className="text-lg font-medium dark:text-white text-gray-800">Health Metrics</h3>
          <a href="#" className="text-sm font-medium dark:text-medical-teal-400 text-blue-600 hover:underline">
            View Details
          </a>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="p-4 dark:bg-medical-blue-700/30 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold dark:text-white text-gray-800">Blood Pressure</h4>
                <span className="text-xs px-2 py-1 rounded-full dark:bg-green-900/30 bg-green-100 dark:text-green-400 text-green-800">Normal</span>
              </div>
              <p className="text-2xl font-bold dark:text-white text-gray-900">120/80</p>
              <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">Last checked: 3 days ago</p>
            </div>
            <div className="p-4 dark:bg-medical-blue-700/30 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold dark:text-white text-gray-800">Heart Rate</h4>
                <span className="text-xs px-2 py-1 rounded-full dark:bg-green-900/30 bg-green-100 dark:text-green-400 text-green-800">Normal</span>
              </div>
              <p className="text-2xl font-bold dark:text-white text-gray-900">72 bpm</p>
              <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">Last checked: 2 days ago</p>
            </div>
            <div className="p-4 dark:bg-medical-blue-700/30 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold dark:text-white text-gray-800">Blood Sugar</h4>
                <span className="text-xs px-2 py-1 rounded-full dark:bg-yellow-900/30 bg-yellow-100 dark:text-yellow-400 text-yellow-800">Elevated</span>
              </div>
              <p className="text-2xl font-bold dark:text-white text-gray-900">110 mg/dL</p>
              <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">Last checked: 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}