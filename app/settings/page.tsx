'use client';

import SettingsHeading from './SettingsHeading';
import SettingsTabs from './SettingsTabs';
import TabContent from './TabContent';
import MainLayout from '../components/layout/MainLayout';

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <SettingsHeading />
        <SettingsTabs />
        <TabContent />
      </div>
    </MainLayout>
  );
} 