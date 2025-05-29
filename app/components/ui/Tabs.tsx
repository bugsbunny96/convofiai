import React, { useRef } from 'react';

/**
 * Generic tab switcher for navigation between sections, with ARIA and keyboard navigation.
 */
export interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, className }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowRight') {
      const nextIdx = (idx + 1) % tabs.length;
      tabRefs.current[nextIdx]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prevIdx = (idx - 1 + tabs.length) % tabs.length;
      tabRefs.current[prevIdx]?.focus();
      e.preventDefault();
    } else if (e.key === 'Home') {
      tabRefs.current[0]?.focus();
      e.preventDefault();
    } else if (e.key === 'End') {
      tabRefs.current[tabs.length - 1]?.focus();
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      onTabChange(tabs[idx]);
      e.preventDefault();
    }
  };

  return (
    <div className={`border-b border-gray-200 pt-4 ${className || ''}`.trim()}>
      <nav className="flex -mb-px" aria-label="Tabs" role="tablist">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            ref={el => { tabRefs.current[idx] = el; }}
            onClick={() => onTabChange(tab)}
            className={`w-1/${tabs.length} py-4 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`tabpanel-${tab}`}
            id={`tab-${tab}`}
            tabIndex={activeTab === tab ? 0 : -1}
            onKeyDown={e => handleKeyDown(e, idx)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs; 