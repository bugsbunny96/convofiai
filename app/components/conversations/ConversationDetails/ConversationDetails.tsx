'use client';

import { useState } from 'react';
import { type Conversation } from '@/app/contexts/useChatStore';
import TabSwitcher from './TabSwitcher';
import InfoTab from './InfoTab';
import HistoryTab from './HistoryTab';
import NotesTab from './NotesTab';

interface ConversationDetailsProps {
  conversation: Conversation;
}

type Tab = 'Info' | 'History' | 'Notes';

export default function ConversationDetails({ conversation }: ConversationDetailsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Info');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Info':
        return <InfoTab conversation={conversation} />;
      case 'History':
        return <HistoryTab conversation={conversation} />;
      case 'Notes':
        return <NotesTab conversation={conversation} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
} 