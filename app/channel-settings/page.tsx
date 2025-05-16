'use client';

import MainLayout from '../components/layout/MainLayout';
import ChannelCard from './ChannelCard';

export default function ChannelSettingsPage() {
  // Example channel data (to be replaced with real API data later)
  const channels = [
    {
      key: 'website-chat',
      name: 'Website Chat',
      status: 'connected' as const,
      lastConnected: '2025-04-02T14:30:00Z',
    },
    {
      key: 'whatsapp',
      name: 'WhatsApp',
      status: 'connected' as const,
      lastConnected: '2025-04-01T09:15:00Z',
    },
    {
      key: 'facebook-messenger',
      name: 'Facebook Messenger',
      status: 'not_connected' as const,
      lastConnected: null,
    },
    {
      key: 'instagram-dms',
      name: 'Instagram DMs',
      status: 'not_connected' as const,
      lastConnected: null,
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-gray-900 font-semibold">Channel Settings</h1>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-50 transition text-sm">
            <span className="text-lg">＋</span> Add Custom Channel
          </button>
        </div>
        <p className="text-gray-600 mb-6">Connect or disconnect platforms, add/edit API tokens, and customize chat widget appearance.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.map((channel) => (
            <ChannelCard key={channel.key} channel={channel} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 