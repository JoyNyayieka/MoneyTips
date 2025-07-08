import React from 'react';

export default function SettingsSection({ title, children }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
}