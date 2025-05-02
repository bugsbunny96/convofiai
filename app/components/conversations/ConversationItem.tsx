'use client';

import Image from 'next/image';
import { type Conversation } from '@/app/contexts/useChatStore';
import { formatDistanceToNow } from 'date-fns';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
}

export default function ConversationItem({ conversation, isActive }: ConversationItemProps) {
  const participant = conversation.participants[0]; // Assuming first participant is the other user

  return (
    <div
      className={`p-4 cursor-pointer border-b border-gray-200 ${
        isActive ? 'bg-blue-50' : 'bg-white'
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="relative">
          {participant.avatar ? (
            <Image
              src={participant.avatar}
              alt={participant.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {participant.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {participant.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Conversation Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {participant.name}
            </h3>
            {conversation.lastMessage && (
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
              </p>
            )}
          </div>
          {conversation.lastMessage && (
            <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.content}</p>
          )}
        </div>

        {/* Unread Count */}
        {conversation.unreadCount > 0 && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
              {conversation.unreadCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 