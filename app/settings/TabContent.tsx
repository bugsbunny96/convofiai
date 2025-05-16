import React from 'react';
import ProfileTab from './tabs/ProfileTab';
import BillingTab from './tabs/BillingTab';
import TeamTab from './tabs/TeamTab';
import NotificationsTab from './tabs/NotificationsTab';
import useSettingsTabStore from './useSettingsTabStore';

const TabContent: React.FC = () => {
  const activeTab = useSettingsTabStore(state => state.activeTab);

  switch (activeTab) {
    case 'My Profile':
      return <ProfileTab />;
    case 'Billing & Plan':
      return <BillingTab />;
    case 'Team Members':
      return <TeamTab />;
    case 'Notifications':
      return <NotificationsTab />;
    default:
      return null;
  }
};

export default TabContent; 