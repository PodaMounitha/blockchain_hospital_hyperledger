import React, { useState } from 'react';
import { patients, getPatientById } from '../../utils/mockData';
import PageHeader from '../PageHeader';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <PageHeader 
        title="Patients" 
        description="View and manage your patient information"
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Patient List */}
        <div className="w-full md:w-1/2 lg:w-2/5">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-700">
              {filteredPatients.map(patient => (
                <li 
                  key={patient.id}
                  className={`px-4 py-3 hover:bg-gray-700 transition-colors cursor-pointer ${
                    selectedPatient && selectedPatient.id === patient.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-lg font-medium text-white">{patient.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white">{patient.name}</p>
                      <p className="text-sm text-gray-400">{patient.email}</p>
                    </div>
                  </div>
                </li>
              ))}
              
              {filteredPatients.length === 0 && (
                <li className="px-4 py-6 text-center text-gray-400">
                  No patients found matching "{searchTerm}"
                </li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Patient Details */}
        <div className="w-full md:w-1/2 lg:w-3/5">
          {selectedPatient ? (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-20 w-20 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-2xl font-medium text-white">{selectedPatient.name.charAt(0)}</span>
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-white">{selectedPatient.name}</h2>
                  <p className="text-gray-400">{selectedPatient.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Age</h3>
                  <p className="text-white">{selectedPatient.age} years</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Gender</h3>
                  <p className="text-white">{selectedPatient.gender}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Blood Type</h3>
                  <p className="text-white">{selectedPatient.bloodType}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Patient ID</h3>
                  <p className="text-white">#{selectedPatient.id.toString().padStart(6, '0')}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  View Medical Records
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  Schedule Appointment
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No Patient Selected</h3>
              <p className="text-gray-400 max-w-md">
                Select a patient from the list to view their detailed information, medical records, and manage their appointments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 