'use client';

import { FC, ReactNode, useState } from 'react';

const tabs = [
  { id: 'basic-info', name: 'Basic Info' },
  { id: 'prompt-behavior', name: 'Prompt & Behavior' },
  { id: 'knowledge-base', name: 'Knowledge Base' },
  { id: 'channels-integrations', name: 'Channels & Integrations' },
];

interface CreateAgentFormTabsProps {
  children: (currentTab: string, setCurrentTab: (tab: string) => void) => ReactNode;
  stepValid?: boolean;
  currentTabIndex?: number;
}

const CreateAgentFormTabs: FC<CreateAgentFormTabsProps> = ({ children, stepValid = true }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab);

  const handleTabClick = (tabId: string, tabIdx: number) => {
    // Only allow moving to next tabs if current step is valid
    if (tabIdx <= currentTabIndex + 1 && (tabIdx <= currentTabIndex || stepValid)) {
      setCurrentTab(tabId);
    }
  };

  return (
    <div className="w-full">
      <nav className="flex w-full overflow-x-auto border-b border-gray-200 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            className={`px-6 py-3 whitespace-nowrap text-sm font-medium border-b-2 transition-colors duration-150 focus:outline-none ${
              currentTab === tab.id
                ? 'border-primary text-primary bg-white'
                : 'border-transparent text-gray-500 hover:text-primary hover:bg-gray-50'
            } ${
              idx > currentTabIndex && !stepValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleTabClick(tab.id, idx)}
            type="button"
            disabled={idx > currentTabIndex && !stepValid}
          >
            {tab.name}
          </button>
        ))}
      </nav>
      {children(currentTab, setCurrentTab)}
    </div>
  );
};

export default CreateAgentFormTabs; 