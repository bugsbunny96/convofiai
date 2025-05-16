interface Tab {
  key: string;
  label: string;
  count: number;
}

interface KnowledgeBaseTabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  counts: { all: number; documents: number; faqs: number; links: number };
}

const tabs: Tab[] = [
  { key: 'all', label: 'All', count: 0 },
  { key: 'documents', label: 'Documents', count: 0 },
  { key: 'faqs', label: 'Faqs', count: 0 },
  { key: 'links', label: 'Links', count: 0 },
];

export default function KnowledgeBaseTabs({ currentTab, onTabChange, counts }: KnowledgeBaseTabsProps) {
  const tabList = tabs.map(tab => ({ ...tab, count: counts[tab.key as keyof typeof counts] || 0 }));
  return (
    <div className="flex gap-2 mb-6 border border-gray-200 bg-white rounded-md p-2">
      {tabList.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary
            ${currentTab === tab.key
              ? 'bg-primary text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          {tab.label}
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${currentTab === tab.key ? 'bg-white text-primary' : 'bg-gray-300 text-gray-700'}`}>{tab.count}</span>
        </button>
      ))}
    </div>
  );
} 