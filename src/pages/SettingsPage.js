import React, { useState } from 'react';
import { FiUser, FiLock, FiBell, FiCreditCard, FiGlobe } from 'react-icons/fi';
import SettingsSection from '../components/Settings/SettingsSection';
import ProfileSettings from '../components/Settings/ProfileSettings';
import SecuritySettings from '../components/Settings/SecuritySettings';
import NotificationSettings from '../components/Settings/NotificationSettings';
import PaymentSettings from '../components/Settings/PaymentSettings';
import LanguageSettings from '../components/Settings/LanguageSettings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const settingsTabs = [
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
    { id: 'security', icon: <FiLock />, label: 'Security' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'payments', icon: <FiCreditCard />, label: 'Payments' },
    { id: 'language', icon: <FiGlobe />, label: 'Language' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4">
          <ul className="space-y-2">
            {settingsTabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center p-3 rounded-lg ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <SettingsSection title={settingsTabs.find(t => t.id === activeTab)?.label || 'Settings'}>
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'payments' && <PaymentSettings />}
            {activeTab === 'language' && <LanguageSettings />}
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}