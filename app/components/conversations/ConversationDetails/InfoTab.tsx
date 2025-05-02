'use client';

import { type Conversation } from '@/app/contexts/useChatStore';
import UserProfileCard from './UserProfileCard';
import ActivityLog from './ActivityLog';
import TagsSection from './TagsSection';
import AdditionalInfo from './AdditionalInfo';

interface InfoTabProps {
  conversation: Conversation;
}

export default function InfoTab({ conversation }: InfoTabProps) {
  const participant = conversation.participants[0];

  return (
    <div className="p-4 space-y-6">
      <UserProfileCard
        name={participant.name}
        email={participant.email}
        location="New York, USA"
        avatar={participant.avatar}
      />
      
      <ActivityLog
        firstContact="Mar 12, 2023"
        lastActive="Today, 10:22 AM"
        totalConversations={3}
      />
      
      <TagsSection
        tags={[
          { id: '1', name: 'VIP', color: 'blue' },
          { id: '2', name: 'Product Inquiry', color: 'gray' }
        ]}
      />
      
      <AdditionalInfo
        company="Johnson & Co"
        role="Marketing Manager"
      />
    </div>
  );
} 