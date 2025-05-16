import React, { useState } from 'react';

const NOTIFICATIONS = [
  {
    label: 'Email Summaries',
    description: 'Receive a daily or weekly summary of your conversations',
    key: 'emailSummaries',
  },
  {
    label: 'Lead Notifications',
    description: 'Get notified when a new lead is captured',
    key: 'leadNotifications',
  },
  {
    label: 'Product Updates',
    description: 'Stay informed about new features and improvements',
    key: 'productUpdates',
  },
  {
    label: 'Security Alerts',
    description: 'Important security-related notifications',
    key: 'securityAlerts',
  },
] as const;

type NotificationKey = typeof NOTIFICATIONS[number]['key'];

const NotificationsTab: React.FC = () => {
  const [prefs, setPrefs] = useState<Record<NotificationKey, boolean>>({
    emailSummaries: true,
    leadNotifications: true,
    productUpdates: false,
    securityAlerts: true,
  });

  const toggle = (key: NotificationKey) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  return (
    <section className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h2 className="text-lg font-semibold mb-2">Notification Preferences</h2>
      <p className="text-gray-500 text-sm mb-4">Choose what updates you receive</p>
      <div className="space-y-6">
        {NOTIFICATIONS.map(n => (
          <div key={n.key} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{n.label}</div>
              <div className="text-gray-500 text-sm">{n.description}</div>
            </div>
            <button
              type="button"
              aria-pressed={prefs[n.key]}
              onClick={() => toggle(n.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${prefs[n.key] ? 'bg-primary' : 'bg-gray-300'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${prefs[n.key] ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotificationsTab; 