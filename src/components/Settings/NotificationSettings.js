import React, { useState } from 'react';
import { FiBell, FiMail } from 'react-icons/fi';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    monthlyReports: true,
    securityAlerts: true,
    promotions: false
  });

  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium flex items-center">
          <FiBell className="mr-2" /> Notification Preferences
        </h3>
        <div className="mt-4 space-y-4">
          {Object.entries({
            email: 'Email Notifications',
            push: 'Push Notifications',
            monthlyReports: 'Monthly Reports',
            securityAlerts: 'Security Alerts',
            promotions: 'Promotional Offers'
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={() => handleToggle(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium flex items-center">
          <FiMail className="mr-2" /> Email Preferences
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleToggle('email')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">Receive email notifications</label>
              <p className="text-gray-500">Get important updates about your account</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={notifications.promotions}
                onChange={() => handleToggle('promotions')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">Marketing communications</label>
              <p className="text-gray-500">Receive tips, promotions and offers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}