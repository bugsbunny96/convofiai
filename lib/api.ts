import axios from 'axios';
import { User, Conversation, Message } from '@/app/types/models';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// User endpoints
export const fetchCurrentUser = async () => {
  const response = await api.get<ApiResponse<User>>('/users/me');
  return response.data.data;
};

// Conversation endpoints
export const fetchConversations = async () => {
  const response = await api.get<ApiResponse<Conversation[]>>('/conversations');
  return response.data.data;
};

export const fetchConversation = async (conversationId: string) => {
  const response = await api.get<ApiResponse<Conversation>>(`/conversations/${conversationId}`);
  return response.data.data;
};

// Message endpoints
export const fetchMessages = async (conversationId: string) => {
  const response = await api.get<ApiResponse<Message[]>>(`/messages/${conversationId}`);
  return response.data.data;
};

export const sendMessage = async (conversationId: string, content: string) => {
  const response = await api.post<ApiResponse<Message>>(`/messages/${conversationId}`, { content });
  return response.data.data;
};

// Notes endpoints
export const fetchNotes = async (conversationId: string): Promise<{ notes: string }> => {
  const response = await api.get<ApiResponse<{ notes: string }>>(`/conversations/${conversationId}/notes`);
  return response.data.data;
};

export const saveNotes = async (conversationId: string, notes: string): Promise<void> => {
  await api.post<ApiResponse<null>>(`/conversations/${conversationId}/notes`, { notes });
};

// Socket event types
export interface SocketMessage {
  type: 'message' | 'typing' | 'read';
  conversationId: string;
  data: {
    message?: Message;
    userId?: string;
    isTyping?: boolean;
    timestamp?: string;
  };
}

export default api; 