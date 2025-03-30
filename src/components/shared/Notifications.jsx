import React, { useState } from 'react';
import { 
  getUserNotifications, 
  formatDateTime 
} from '../../utils/mockData';
import PageHeader from '../PageHeader';
import EmptyState from '../EmptyState';
import { 
  BellIcon, 
  CheckCircleIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function Notifications({ userType, userId }) {
  const [markingAsRead, setMarkingAsRead] = useState(false);
  
  // Get user notifications
  const allNotifications = getUserNotifications(userId);
  
  // Sort notifications by date (newest first)
  const sortedNotifications = [...allNotifications].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Group notifications by read status
  const unreadNotifications = sortedNotifications.filter(notification => !notification.read);
  const readNotifications = sortedNotifications.filter(notification => notification.read);
  
  // Get notification icon by type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return CalendarIcon;
      case 'message':
        return ChatBubbleLeftIcon;
      case 'record':
        return DocumentTextIcon;
      default:
        return BellIcon;
    }
  };
  
  // Mark all as read
  const handleMarkAllAsRead = () => {
    setMarkingAsRead(true);
    
    // In a real app, this would call an API to mark all as read
    setTimeout(() => {
      setMarkingAsRead(false);
    }, 1000);
  };
  
  return (
    <div>
      <PageHeader 
        title="Notifications" 
        description="Stay updated with important information"
      />
      
      {/* Mark all as read button (only show if there are unread notifications) */}
      {unreadNotifications.length > 0 && (
        <div className="flex justify-end mb-6">
          <button
            onClick={handleMarkAllAsRead}
            disabled={markingAsRead}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
          >
            {markingAsRead ? (
              <>
                <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                Marking as read...
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5 mr-1" />
                Mark all as read
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3">Unread</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-700">
              {unreadNotifications.map(notification => {
                const IconComponent = getNotificationIcon(notification.type);
                
                return (
                  <li key={notification.id} className="p-4 hover:bg-gray-700 transition-colors">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-white">{notification.content}</p>
                          <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">
                            {formatDateTime(notification.date)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                            Mark as read
                          </button>
                          {notification.type === 'appointment' && (
                            <button className="ml-3 text-xs text-blue-500 hover:text-blue-400 transition-colors">
                              View appointment
                            </button>
                          )}
                          {notification.type === 'message' && (
                            <button className="ml-3 text-xs text-blue-500 hover:text-blue-400 transition-colors">
                              View message
                            </button>
                          )}
                          {notification.type === 'record' && (
                            <button className="ml-3 text-xs text-blue-500 hover:text-blue-400 transition-colors">
                              View record
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      
      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Earlier</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-700">
              {readNotifications.map(notification => {
                const IconComponent = getNotificationIcon(notification.type);
                
                return (
                  <li key={notification.id} className="p-4 hover:bg-gray-700 transition-colors opacity-75">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-300">{notification.content}</p>
                          <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                            {formatDateTime(notification.date)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          {notification.type === 'appointment' && (
                            <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                              View appointment
                            </button>
                          )}
                          {notification.type === 'message' && (
                            <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                              View message
                            </button>
                          )}
                          {notification.type === 'record' && (
                            <button className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                              View record
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      
      {/* No notifications state */}
      {sortedNotifications.length === 0 && (
        <EmptyState
          icon={BellIcon}
          title="No notifications"
          description="You're all caught up! There are no notifications to display at this time."
        />
      )}
    </div>
  );
} 