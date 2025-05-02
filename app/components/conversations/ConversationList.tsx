'use client';

import { useEffect, useState } from 'react';
import { fetchConversations } from '@/lib/api';
import { mockConversations } from '@/lib/mockData';
import useChatStore from '@/app/contexts/useChatStore';
import ConversationItem from './ConversationItem';

export default function ConversationList() {
  const { conversations, setConversations, selectedConversation } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setIsLoading(true);
        // In development, use mock data
        if (process.env.NODE_ENV === 'development') {
          setConversations(mockConversations);
        } else {
          const data = await fetchConversations();
          setConversations(data);
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        setError('Failed to load conversations');
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [setConversations]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={selectedConversation?.id === conversation.id}
          />
        ))}
      </div>
    </div>
  );
} 