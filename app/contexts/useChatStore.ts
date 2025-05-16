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
  drafts: Record<string, string>;
  messagesByConversation: Record<string, Message[]>;
  setConversations: (conversations: Conversation[]) => void;
  setSelectedConversation: (conversation: Conversation | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setDraft: (conversationId: string, value: string) => void;
  setMessagesForConversation: (conversationId: string, messages: Message[]) => void;
  addMessageForConversation: (conversationId: string, message: Message) => void;
  resetUnreadCount: (conversationId: string) => void;
  incrementUnreadCount: (conversationId: string) => void;
  updateConversationLastMessage: (conversationId: string, message: Message) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],
  drafts: {},
  messagesByConversation: {},
  setConversations: (conversations) => set({ conversations }),
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setDraft: (conversationId, value) => set((state) => ({ drafts: { ...state.drafts, [conversationId]: value } })),
  setMessagesForConversation: (conversationId, messages) => set((state) => ({ messagesByConversation: { ...state.messagesByConversation, [conversationId]: messages } })),
  addMessageForConversation: (conversationId, message) => set((state) => ({ messagesByConversation: { ...state.messagesByConversation, [conversationId]: [...(state.messagesByConversation[conversationId] || []), message] } })),
  resetUnreadCount: (conversationId) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    )
  })),
  incrementUnreadCount: (conversationId) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: (conv.unreadCount || 0) + 1 } : conv
    )
  })),
  updateConversationLastMessage: (conversationId, message) => set((state) => ({
    conversations: state.conversations.map(conv =>
      conv.id === conversationId ? { ...conv, lastMessage: message } : conv
    )
  })),
}));

export default useChatStore; 