// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  role: 'admin' | 'agent' | 'user';
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

// Organization Model
export interface Organization {
  id: string;
  name: string;
  logo?: string;
  plan: 'free' | 'pro' | 'enterprise';
  settings: {
    branding: {
      primaryColor: string;
      secondaryColor: string;
    };
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

// Agent Model
export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  type: 'chat' | 'voice' | 'email';
  status: 'active' | 'inactive' | 'maintenance';
  capabilities: string[];
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

// Wallet Model
export interface Wallet {
  id: string;
  userId: string;
  organizationId: string;
  balance: number;
  currency: string;
  transactions: {
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Extend existing Message interface
export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'file' | 'system';
  metadata?: {
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
  };
}

// Extend existing Conversation interface
export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  status: 'active' | 'archived' | 'deleted';
  tags: string[];
  assignedAgent?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}
