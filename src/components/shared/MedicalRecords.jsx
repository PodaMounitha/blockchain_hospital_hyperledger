import React, { useState } from 'react';
import { 
  getPatientMedicalRecords, 
  getDoctorById, 
  formatDate 
} from '../../utils/mockData';
import PageHeader from '../PageHeader';
import EmptyState from '../EmptyState';
import { 
  DocumentTextIcon, 
  DocumentPlusIcon, 
  DocumentMagnifyingGlassIcon, 
  DocumentArrowDownIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function MedicalRecords({ userType, userId }) {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get patient's medical records (if doctor, this would be filtered to show only records they have access to)
  const allRecords = userType === 'patient'
    ? getPatientMedicalRecords(userId)
    : getPatientMedicalRecords(1); // For demo: just showing patient 1's records for doctor view
  
  // Sort records by date (newest first)
  const sortedRecords = [...allRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Filter records by search term
  const filteredRecords = sortedRecords.filter(record => 
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Record type icons
  const recordTypeIcons = {
    'Examination': ClipboardDocumentListIcon,
    'Lab Results': ClipboardDocumentCheckIcon,
    'Diagnosis': DocumentMagnifyingGlassIcon,
    'Procedure': DocumentTextIcon,
  };
  
  return (
    <div>
      <PageHeader 
        title="Medical Records" 
        description="View and manage medical records"
      />
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <input
            type="text"
            className="w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DocumentMagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {userType === 'doctor' && (
          <button
            onClick={() => setShowAddRecord(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
          >
            <DocumentPlusIcon className="h-5 w-5 mr-1" />
            Add Record
          </button>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Records List */}
        <div className="w-full lg:w-1/3">
          {filteredRecords.length > 0 ? (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-700">
                {filteredRecords.map(record => {
                  const IconComponent = recordTypeIcons[record.type] || DocumentTextIcon;
                  
                  return (
                    <li 
                      key={record.id}
                      className={`p-4 hover:bg-gray-700 transition-colors cursor-pointer ${
                        selectedRecord && selectedRecord.id === record.id ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => setSelectedRecord(record)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-700 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white">{record.title}</p>
                          <p className="text-xs text-gray-400">{record.type}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(record.date)}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400">
                {searchTerm
                  ? `No records matching "${searchTerm}"`
                  : "No medical records found"
                }
              </p>
            </div>
          )}
        </div>
        
        {/* Record Details */}
        <div className="w-full lg:w-2/3">
          {selectedRecord ? (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedRecord.title}</h2>
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      {selectedRecord.type}
                    </span>
                    <span className="text-sm text-gray-400">{formatDate(selectedRecord.date)}</span>
                  </div>
                </div>
                {userType === 'doctor' && (
                  <button className="text-blue-500 hover:text-blue-400 transition-colors">
                    Edit Record
                  </button>
                )}
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Description</h3>
                <p className="text-white">{selectedRecord.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Attachments</h3>
                {selectedRecord.attachments.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedRecord.attachments.map((attachment, index) => (
                      <li key={index} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-white">{attachment.name}</span>
                        </div>
                        <button className="text-blue-500 hover:text-blue-400 transition-colors flex items-center">
                          <DocumentArrowDownIcon className="h-5 w-5 mr-1" />
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No attachments</p>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="font-medium text-white">
                      {getDoctorById(selectedRecord.doctorId).name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {getDoctorById(selectedRecord.doctorId).name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {getDoctorById(selectedRecord.doctorId).specialty}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={DocumentTextIcon}
              title="No record selected"
              description="Select a record from the list to view its details."
            />
          )}
        </div>
      </div>
      
      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-white mb-4">Add Medical Record</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Patient
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select a patient</option>
                  <option value="1">Alex Thompson</option>
                  <option value="2">Emily Wilson</option>
                  <option value="3">Robert Johnson</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Record Type
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select type</option>
                  <option value="Examination">Examination</option>
                  <option value="Lab Results">Lab Results</option>
                  <option value="Diagnosis">Diagnosis</option>
                  <option value="Procedure">Procedure</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Title
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter record title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Enter detailed description"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Upload Attachments
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H4m16-12h12m4 0h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRecord(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    // In a real app, this would save the record
                    setShowAddRecord(false);
                  }}
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 