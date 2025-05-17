'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { fetchConversations } from '@/lib/api';
import { mockConversations } from '@/lib/mockData';
import useChatStore from '@/app/contexts/useChatStore';
import ConversationItem from './ConversationItem';
import Spinner from '@/app/components/ui/Spinner';
import ErrorState from '@/app/components/ui/ErrorState';
import EmptyState from '@/app/components/ui/EmptyState';

export default function ConversationList() {
  const { conversations, setConversations, selectedConversation } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const didAutoSelect = useRef(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const loadConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
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
  }, [setConversations]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Auto-select the first conversation if none is selected and conversations exist
  useEffect(() => {
    if (
      !didAutoSelect.current &&
      !selectedConversation &&
      conversations &&
      conversations.length > 0
    ) {
      useChatStore.getState().setSelectedConversation(conversations[0]);
      didAutoSelect.current = true;
    }
  }, [conversations, selectedConversation]);

  // Filter conversations by participant name or email
  const filteredConversations = useMemo(() => {
    if (!debouncedSearch) return conversations;
    const lower = debouncedSearch.toLowerCase();
    return conversations.filter((conv) =>
      conv.participants.some(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.email.toLowerCase().includes(lower)
      )
    );
  }, [conversations, debouncedSearch]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={loadConversations} retryLabel="Retry loading conversations" />;

  // If no conversations, show dummy data loader
  if (!conversations || conversations.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <EmptyState
          message="No conversations found."
          action={
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
              onClick={() => setConversations(mockConversations)}
            >
              Load Demo Conversations
            </button>
          }
        />
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search conversations"
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
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={selectedConversation?.id === conversation.id}
            onClick={() => useChatStore.getState().setSelectedConversation(conversation)}
          />
        ))}
        {filteredConversations.length === 0 && (
          <EmptyState message="No conversations found." />
        )}
      </div>
    </div>
  );
} 