import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isOnline: boolean;
  }[];
  lastMessage?: Message;
  unreadCount: number;
}

interface ChatStore {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: Message[];
  setConversations: (conversations: Conversation[]) => void;
  setSelectedConversation: (conversation: Conversation | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],
  setConversations: (conversations) => set({ conversations }),
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));

export default useChatStore; 