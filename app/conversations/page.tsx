'use client';

import { useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ConversationList from '../components/conversations/ConversationList';
import ChatWindow from '../components/conversations/ChatWindow';
import ConversationDetails from '../components/conversations/ConversationDetails/ConversationDetails';
import EmptyChatState from '../components/conversations/EmptyChatState';
import useChatStore from '../contexts/useChatStore';
import { connectSocket, disconnectSocket } from '@/lib/socket';

export default function ConversationsPage() {
  const selectedConversation = useChatStore((state) => state.selectedConversation);

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
        {/* Left Sidebar - Conversation List */}
        <div className="hidden md:block md:w-80 border-r border-gray-200 bg-white">
          <ConversationList />
        </div>

        {/* Main Chat Window */}
        <div className="flex-1 bg-gray-50 w-full">
          {/* Mobile header for context */}
          <div className="md:hidden p-4 border-b border-gray-200 bg-white font-semibold text-lg">
            Conversations
          </div>
          {selectedConversation ? (
            <ChatWindow conversation={selectedConversation} />
          ) : (
            <EmptyChatState />
          )}
        </div>

        {/* Right Sidebar - Conversation Details */}
        {selectedConversation && (
          <div className="hidden md:block md:w-80 border-l border-gray-200 bg-white">
            <ConversationDetails conversation={selectedConversation} />
          </div>
        )}
      </div>
    </MainLayout>
  );
} 