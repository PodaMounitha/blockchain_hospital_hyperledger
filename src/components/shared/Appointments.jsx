import React, { useState } from 'react';
import { 
  getPatientAppointments, 
  getDoctorAppointments, 
  getPatientById, 
  getDoctorById,
  formatDateTime 
} from '../../utils/mockData';
import PageHeader from '../PageHeader';
import EmptyState from '../EmptyState';
import { CalendarIcon, ClockIcon, UserIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Appointments({ userType, userId }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  
  // Get appointments based on user type
  const allAppointments = userType === 'doctor' 
    ? getDoctorAppointments(userId) 
    : getPatientAppointments(userId);
  
  // Filter appointments based on active tab
  const currentDate = new Date();
  const upcomingAppointments = allAppointments.filter(appt => new Date(appt.date) >= currentDate);
  const pastAppointments = allAppointments.filter(appt => new Date(appt.date) < currentDate);
  
  const displayAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  
  return (
    <div>
      <PageHeader 
        title="Appointments" 
        description="Manage your upcoming and past appointments"
      />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'upcoming' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'past' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
        
        <button
          onClick={() => setShowNewAppointment(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          New Appointment
        </button>
      </div>
      
      {displayAppointments.length > 0 ? (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-700">
            {displayAppointments.map(appointment => {
              // Get the other party's info (doctor or patient)
              const otherParty = userType === 'doctor' 
                ? getPatientById(appointment.patientId)
                : getDoctorById(appointment.doctorId);
              
              const appointmentDate = new Date(appointment.date);
              const formattedDate = formatDateTime(appointmentDate);
              
              return (
                <li key={appointment.id} className="p-4 hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                          <span className="text-lg font-medium text-white">{otherParty.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white">{otherParty.name}</p>
                          <div className="flex items-center text-gray-400 text-xs">
                            <div className="flex items-center mr-3">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center">
                              <UserIcon className="h-3 w-3 mr-1" />
                              <span>{appointment.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appointment.status === 'scheduled' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status === 'scheduled' ? 'Scheduled' : 'Pending'}
                      </span>
                      
                      {activeTab === 'upcoming' && (
                        <>
                          <button className="text-blue-500 text-sm font-medium hover:text-blue-400 transition-colors">
                            Reschedule
                          </button>
                          <button className="text-red-500 text-sm font-medium hover:text-red-400 transition-colors">
                            Cancel
                          </button>
                        </>
                      )}
                      
                      {activeTab === 'past' && (
                        <button className="text-blue-500 text-sm font-medium hover:text-blue-400 transition-colors">
                          View Summary
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-2 pl-14">
                      <p className="text-sm text-gray-400">{appointment.notes}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <EmptyState
          icon={CalendarIcon}
          title={`No ${activeTab} appointments`}
          description={activeTab === 'upcoming' 
            ? "You don't have any upcoming appointments scheduled."
            : "You don't have any past appointments in your history."
          }
          actionLabel={activeTab === 'upcoming' ? "Schedule Appointment" : null}
          onAction={activeTab === 'upcoming' ? () => setShowNewAppointment(true) : null}
        />
      )}
      
      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-white mb-4">Schedule New Appointment</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  {userType === 'doctor' ? 'Patient' : 'Doctor'}
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select {userType === 'doctor' ? 'a patient' : 'a doctor'}</option>
                  {/* Options would be populated based on user type */}
                </select>
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
                  Time
                </label>
                <input 
                  type="time" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Appointment Type
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select type</option>
                  <option value="Check-up">Check-up</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Specialist Referral">Specialist Referral</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Notes
                </label>
                <textarea 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Add any notes or reason for appointment"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewAppointment(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    // In a real app, this would save the appointment
                    setShowNewAppointment(false);
                  }}
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 