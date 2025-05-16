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

// Agent Model (Frontend)
export interface Agent {
  id: string;
  name: string;
  description: string;
  skills: string[]; // e.g. ["Browse Web", "API Access"]
  avatarUrl: string;
  status: "active" | "inactive";
  createdAt: string;
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

export enum LeadStatus {
  New = 'New',
  Contacted = 'Contacted',
  Converted = 'Converted',
}

export enum LeadSource {
  WebsiteChat = 'Website Chat',
  WhatsApp = 'WhatsApp',
  Messenger = 'Messenger',
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  agent: string;
  date: string; // ISO date string
  status: LeadStatus;
}
