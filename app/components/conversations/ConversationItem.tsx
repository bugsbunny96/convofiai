'use client';

import { type Conversation } from '@/app/contexts/useChatStore';
import useChatStore from '@/app/contexts/useChatStore';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) {
  const { resetUnreadCount } = useChatStore();
  const participant = conversation.participants[0]; // Assuming first participant is the other user

  const handleClick = () => {
    // Reset unread count when conversation is selected
    resetUnreadCount(conversation.id);
    onClick();
  };

  // Format the last message timestamp
  const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div
      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
        isActive ? 'bg-gray-100' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {participant.avatar ? (
              <Image src={participant.avatar} alt={participant.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-bold">{participant.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          {/* Online/Offline Status */}
          <div 
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              participant.isOnline 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-gray-400'
            }`}
            aria-label={participant.isOnline ? 'Online' : 'Offline'}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {participant.name}
            </h3>
            {conversation.lastMessage && (
              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                {formatLastMessageTime(conversation.lastMessage.timestamp)}
              </span>
            )}
          </div>

          {/* Last Message */}
          <div className="mt-1 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {conversation.lastMessage ? (
                <p 
                  className={`text-sm truncate ${
                    conversation.unreadCount > 0 && !isActive 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-500'
                  }`}
                  title={conversation.lastMessage.content}
                >
                  {conversation.lastMessage.content}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">No messages yet</p>
              )}
            </div>
            
            {/* Unread Count */}
            {conversation.unreadCount > 0 && !isActive && (
              <span 
                className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full"
                aria-label={`${conversation.unreadCount} unread message${conversation.unreadCount > 1 ? 's' : ''}`}
              >
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 