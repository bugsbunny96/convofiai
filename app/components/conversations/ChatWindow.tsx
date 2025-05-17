'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { subscribeToConversation, unsubscribeFromConversation } from '@/lib/socket';
import useChatStore from '@/app/contexts/useChatStore';
import { type Conversation, Message } from '@/app/contexts/useChatStore';
import ChatMessage from '@/app/components/conversations/ChatMessage';

interface ChatWindowProps {
  conversation: Conversation;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    drafts,
    setDraft,
    messagesByConversation,
    addMessageForConversation,
    updateConversationLastMessage,
  } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  // For demo, assume always connected. Replace with real connection state if available.
  const isConnected = true;

  const messages = useMemo(() => messagesByConversation[conversation.id] || [], [messagesByConversation, conversation.id]);
  const draft = drafts[conversation.id] || '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setInput(draft);
  }, [draft, conversation.id]);

  useEffect(() => {
    // Subscribe to conversation when component mounts
    const handler = (socketMessage: unknown) => {
      if (
        typeof socketMessage === 'object' &&
        socketMessage !== null &&
        'type' in socketMessage &&
        'data' in socketMessage
      ) {
        const msg = socketMessage as { type: string; data: { message?: Message; isTyping?: boolean } };
        if (msg.type === 'message' && msg.data.message) {
          addMessageForConversation(conversation.id, msg.data.message);
          updateConversationLastMessage(conversation.id, msg.data.message);
        } else if (msg.type === 'typing' && typeof msg.data.isTyping === 'boolean') {
          setIsTyping(msg.data.isTyping);
        }
      }
    };
    subscribeToConversation(conversation.id, handler);

    // Cleanup subscription when component unmounts
    return () => {
      unsubscribeFromConversation(conversation.id);
    };
  }, [conversation.id, addMessageForConversation, updateConversationLastMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setDraft(conversation.id, e.target.value);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    // Send message through API (replace with real API call)
    const message = {
      id: Date.now().toString(),
      content: input,
      sender: 'me',
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    addMessageForConversation(conversation.id, message);
    updateConversationLastMessage(conversation.id, message);
    setDraft(conversation.id, '');
    setInput('');
    // Send through socket if needed
  };

  // Dummy chat messages for demo if no messages exist
  const dummyMessages = [
    {
      id: '1',
      sender: 'customer',
      content: 'Hello! I have a question about your product.',
      timestamp: new Date().toISOString(),
      isRead: true,
    },
    {
      id: '2',
      sender: 'agent',
      content: "Hi! I'd be happy to help you with any questions you have about our products. What would you like to know?",
      timestamp: new Date().toISOString(),
      isRead: true,
    },
    {
      id: '3',
      sender: 'customer',
      content: 'I\'m looking for a product that can help me with time management. Do you have anything like that?',
      timestamp: new Date().toISOString(),
      isRead: true,
    },
    {
      id: '4',
      sender: 'agent',
      content: 'Absolutely! We have several tools that can help with time management. Our most popular one is the ConvofyAI Scheduler which allows you to automate your booking process and save time on calendar management. Would you like more information about it?',
      timestamp: new Date().toISOString(),
      isRead: true,
    },
    {
      id: '5',
      sender: 'customer',
      content: 'That sounds perfect. Thank you for your help!',
      timestamp: new Date().toISOString(),
      isRead: true,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Connection Status Banner */}
      {!isConnected && (
        <div className="bg-yellow-100 text-yellow-800 p-2 text-center text-sm">
          Reconnecting to chat...
        </div>
      )}
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {conversation.participants[0].name}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span 
                className={`inline-block w-2 h-2 rounded-full ${
                  conversation.participants[0].isOnline 
                    ? 'bg-green-500 animate-pulse' 
                    : 'bg-gray-400'
                }`}
                aria-hidden="true"
              />
              {conversation.participants[0].isOnline ? 'Online' : 'Offline'}
              {isTyping && ' • Typing...'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(messages.length > 0 ? messages : dummyMessages).map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-4"
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Type a message"
            onFocus={() => {
              // Optionally send typing event
            }}
            onBlur={() => {
              // Optionally send typing event
            }}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
} 