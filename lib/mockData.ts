import { User, Conversation, Message } from '@/app/types/models';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
    role: 'user',
    organizationId: 'org1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isOnline: false,
    role: 'agent',
    organizationId: 'org1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    sender: '2',
    timestamp: '2024-01-01T10:00:00Z',
    isRead: true,
    type: 'text',
  },
  {
    id: '2',
    content: 'I have a question about your product',
    sender: '1',
    timestamp: '2024-01-01T10:01:00Z',
    isRead: true,
    type: 'text',
  },
  {
    id: '3',
    content: 'Sure! What would you like to know?',
    sender: '2',
    timestamp: '2024-01-01T10:02:00Z',
    isRead: true,
    type: 'text',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[2],
    unreadCount: 0,
    status: 'active',
    tags: ['product-inquiry', 'new-customer'],
    assignedAgent: '2',
    organizationId: 'org1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T10:02:00Z',
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: '4',
      content: 'Thanks for your help!',
      sender: '1',
      timestamp: '2024-01-01T11:00:00Z',
      isRead: false,
      type: 'text',
    },
    unreadCount: 1,
    status: 'active',
    tags: ['follow-up', 'satisfied'],
    assignedAgent: '2',
    organizationId: 'org1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T11:00:00Z',
  },
]; 