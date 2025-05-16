import { FC, ReactNode, useState } from 'react';

const tabs = [
  { id: 'basic-info', name: 'Basic Info' },
  { id: 'prompt-behavior', name: 'Prompt & Behavior' },
  { id: 'knowledge-base', name: 'Knowledge Base' },
  { id: 'channels-integrations', name: 'Channels & Integrations' },
];

interface CreateAgentFormTabsProps {
  children: (currentTab: string, setCurrentTab: (tab: string) => void) => ReactNode;
}

const CreateAgentFormTabs: FC<CreateAgentFormTabsProps> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <nav className="flex w-full overflow-x-auto border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 whitespace-nowrap text-sm font-medium border-b-2 transition-colors duration-150 focus:outline-none ${
              currentTab === tab.id
                ? 'border-primary text-primary bg-white'
                : 'border-transparent text-gray-500 hover:text-primary hover:bg-gray-50'
            }`}
            onClick={() => setCurrentTab(tab.id)}
            type="button"
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