export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  knowledgeBase?: string[];
  tools?: string[];
  settings?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  };
} 