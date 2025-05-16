'use client';

interface TabSwitcherProps {
  activeTab: string;
  onTabChange: (tab: 'Info' | 'History' | 'Notes') => void;
}

const tabs = ['Info', 'History', 'Notes'] as const;

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="border-b border-gray-200 pt-4">
      <nav className="flex -mb-px" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm
              ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
} 