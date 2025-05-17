import { create } from 'zustand';

export interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  temperature: number;
  maxTokens: number;
  status: 'active' | 'inactive';
  lastActive?: string;
  conversationsCount?: number;
  channels: string[];
  avatarUrl?: string;
  skills?: string[];
}

interface UseAgentsState {
  agents: Agent[];
  isLoading: boolean;
  error: Error | null;
  isDuplicating: string | null;
  addAgent: (agent: Omit<Agent, 'id'>) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  updateAgent: (id: string, data: Partial<Agent>) => Promise<void>;
  duplicateAgent: (id: string) => Promise<void>;
}

// Dummy data for initial state
const dummyAgents: Agent[] = [
  {
    id: '1',
    name: 'Sales Assistant',
    description: 'Helps potential customers find the right products and answers pricing questions.',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    status: 'active',
    lastActive: '2024-03-20T10:30:00Z',
    conversationsCount: 125,
    channels: ['Website Chat', 'WhatsApp']
  },
  {
    id: '2',
    name: 'Customer Support',
    description: 'Handles customer inquiries, troubleshooting, and support tickets.',
    model: 'gpt-4',
    temperature: 0.8,
    maxTokens: 2000,
    status: 'active',
    lastActive: '2024-03-20T09:15:00Z',
    conversationsCount: 248,
    channels: ['Website Chat', 'WhatsApp', 'Messenger']
  }
];

export const useAgents = create<UseAgentsState>((set, get) => ({
  agents: dummyAgents,
  isLoading: false,
  error: null,
  isDuplicating: null,

  addAgent: async (agent) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newAgent = {
        ...agent,
        id: Math.random().toString(36).substring(2, 9),
        status: 'active' as const,
        conversationsCount: 0,
        channels: agent.channels || []
      };
      set(state => ({ agents: [...state.agents, newAgent] }));
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAgent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({ agents: state.agents.filter(agent => agent.id !== id) }));
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateAgent: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        agents: state.agents.map(agent =>
          agent.id === id ? { ...agent, ...data } : agent
        )
      }));
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  duplicateAgent: async (id) => {
    set({ isLoading: true, error: null, isDuplicating: id });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const agentToDuplicate = get().agents.find(agent => agent.id === id);
      if (agentToDuplicate) {
        const duplicatedAgent = {
          ...agentToDuplicate,
          id: Math.random().toString(36).substring(2, 9),
          name: `${agentToDuplicate.name} (Copy)`,
          conversationsCount: 0,
          channels: [...agentToDuplicate.channels]
        };
        set(state => ({ agents: [...state.agents, duplicatedAgent] }));
      }
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false, isDuplicating: null });
    }
  }
})); 