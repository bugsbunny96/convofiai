import { create } from 'zustand';

interface SettingsTabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TAB_LIST = ['My Profile', 'Billing & Plan', 'Team Members', 'Notifications'];

const useSettingsTabStore = create<SettingsTabState>(set => ({
  activeTab: TAB_LIST[0],
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useSettingsTabStore; 