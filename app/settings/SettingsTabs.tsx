import React from 'react';
import Tabs from '../components/ui/Tabs';
import useSettingsTabStore from './useSettingsTabStore';

const TAB_LIST = ['My Profile', 'Billing & Plan', 'Team Members', 'Notifications'];

const SettingsTabs: React.FC = () => {
  const activeTab = useSettingsTabStore(state => state.activeTab);
  const setActiveTab = useSettingsTabStore(state => state.setActiveTab);

  return (
    <Tabs
      tabs={TAB_LIST}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      className="mb-8"
    />
  );
};

export default SettingsTabs; 