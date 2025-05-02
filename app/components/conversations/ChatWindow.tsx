'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type Conversation } from '@/app/contexts/useChatStore';
import useChatStore from '@/app/contexts/useChatStore';
import { sendMessage } from '@/lib/api';
import { subscribeToConversation, unsubscribeFromConversation, sendSocketMessage } from '@/lib/socket';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  conversation: Conversation;
}

interface MessageForm {
  content: string;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, setMessages } = useChatStore();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Subscribe to conversation when component mounts
    subscribeToConversation(conversation.id, (socketMessage) => {
      if (socketMessage.type === 'message' && socketMessage.data.message) {
        addMessage(socketMessage.data.message);
      } else if (socketMessage.type === 'typing') {
        setIsTyping(socketMessage.data.isTyping || false);
      }
    });

    // Cleanup subscription when component unmounts
    return () => {
      unsubscribeFromConversation(conversation.id);
    };
  }, [conversation.id, addMessage]);

  const onSubmit = async (data: MessageForm) => {
    try {
      // Send message through API
      const message = await sendMessage(conversation.id, data.content);
      
      // Add message to local state
      addMessage(message);
      
      // Send message through socket
      sendSocketMessage({
        type: 'message',
        conversationId: conversation.id,
        data: { message }
      });
      
      reset();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {conversation.participants[0].name}
            </h2>
            <p className="text-sm text-gray-500">
              {conversation.participants[0].isOnline ? 'Online' : 'Offline'}
              {isTyping && ' • Typing...'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
          <input
            {...register('content', { required: true })}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onFocus={() => {
              sendSocketMessage({
                type: 'typing',
                conversationId: conversation.id,
                data: { isTyping: true }
              });
            }}
            onBlur={() => {
              sendSocketMessage({
                type: 'typing',
                conversationId: conversation.id,
                data: { isTyping: false }
              });
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