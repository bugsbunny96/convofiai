'use client';

import { type Message } from '@/app/contexts/useChatStore';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isCurrentUser = message.sender === 'current_user'; // You'll need to implement proper user checking

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[70%] px-3 sm:px-4 py-2 rounded-lg ${
          isCurrentUser
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm sm:text-base break-words">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isCurrentUser ? 'text-primary-100' : 'text-gray-500'
          }`}
        >
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
} 