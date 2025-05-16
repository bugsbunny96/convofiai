'use client';

import MainLayout from '../../components/layout/MainLayout';
import CreateAgentFormTabs from '@/app/components/ai-agents/CreateAgentFormTabs';
import BasicInfoStep from '@/app/components/ai-agents/CreateAgentForm/BasicInfoStep';
import PromptBehaviorStep from '@/app/components/ai-agents/CreateAgentForm/PromptBehaviorStep';
import KnowledgeBaseStep from '@/app/components/ai-agents/CreateAgentForm/KnowledgeBaseStep';
import ChannelsIntegrationsStep from '@/app/components/ai-agents/CreateAgentForm/ChannelsIntegrationsStep';
import { useState } from 'react';
import { BasicInfoData } from '@/app/components/ai-agents/CreateAgentForm/BasicInfoStep';
import { KnowledgeBaseData } from '@/app/components/ai-agents/CreateAgentForm/KnowledgeBaseStep';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAgents } from '@/app/hooks/useAgents';

interface PromptBehaviorData {
  systemPrompt: string;
  communicationTone: string;
  fallbackBehavior: string;
  agentName: string;
  active: boolean;
  temperature: number;
  maxTokens: number;
}

const tabOrder = [
  'basic-info',
  'prompt-behavior',
  'knowledge-base',
  'channels-integrations',
];

export default function CreateAgentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { agents, updateAgent } = useAgents();
  const agentId = searchParams.get('id');
  const isEditMode = Boolean(agentId);

  // Find agent if editing
  const editingAgent = isEditMode ? agents.find(a => a.id === agentId) : undefined;

  // Map agent data to step states if editing
  const initialBasicInfo: BasicInfoData = editingAgent
    ? {
        name: editingAgent.name || '',
        description: editingAgent.description || '',
        active: editingAgent.status === 'active',
        avatar: editingAgent.avatarUrl || null,
      }
    : { name: '', description: '', active: false, avatar: null };

  // For demo, fill with defaults for other steps (extend as needed)
  const initialPromptBehavior: PromptBehaviorData = editingAgent
    ? {
        systemPrompt: '',
        communicationTone: editingAgent.skills?.[0] || '',
        fallbackBehavior: '',
        agentName: editingAgent.name || '',
        active: editingAgent.status === 'active',
        temperature: 0.5,
        maxTokens: 800,
      }
    : { systemPrompt: '', communicationTone: '', fallbackBehavior: '', agentName: '', active: false, temperature: 0.5, maxTokens: 800 };

  const initialKnowledgeBase: KnowledgeBaseData = editingAgent
    ? { files: [], urls: [], faqs: [{ question: '', answer: '' }], agentName: editingAgent.name || '' }
    : { files: [], urls: [], faqs: [{ question: '', answer: '' }], agentName: '' };

  // State
  const [currentTab, setCurrentTab] = useState(tabOrder[0]);
  const [basicInfoData, setBasicInfoData] = useState<BasicInfoData>(initialBasicInfo);
  const [basicInfoValid, setBasicInfoValid] = useState(false);
  const [promptBehaviorData, setPromptBehaviorData] = useState<PromptBehaviorData>(initialPromptBehavior);
  const [promptBehaviorValid, setPromptBehaviorValid] = useState(false);
  const [knowledgeBaseData, setKnowledgeBaseData] = useState<KnowledgeBaseData>(initialKnowledgeBase);
  const [knowledgeBaseValid, setKnowledgeBaseValid] = useState(false);

  // Determine which step's validity to enforce
  const stepValid =
    currentTab === 'basic-info'
      ? basicInfoValid
      : currentTab === 'prompt-behavior'
      ? promptBehaviorValid
      : currentTab === 'knowledge-base'
      ? knowledgeBaseValid
      : true;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit AI Agent' : 'Create New AI Agent'}</h1>
          <CreateAgentFormTabs stepValid={stepValid}>
            {(tab, setTab) => {
              if (tab !== currentTab) setCurrentTab(tab);
              return (
                <div>
                  {tab === 'basic-info' && (
                    <BasicInfoStep
                      value={basicInfoData}
                      onChange={(data, valid) => {
                        setBasicInfoData(data);
                        setBasicInfoValid(valid);
                      }}
                      onNext={() => setTab('prompt-behavior')}
                    />
                  )}
                  {tab === 'prompt-behavior' && (
                    <PromptBehaviorStep
                      value={promptBehaviorData}
                      onChange={(data, valid) => {
                        setPromptBehaviorData(data);
                        setPromptBehaviorValid(valid);
                      }}
                      onNext={() => setTab('knowledge-base')}
                      onCancel={() => router.push('/ai-agents')}
                    />
                  )}
                  {tab === 'knowledge-base' && (
                    <KnowledgeBaseStep
                      value={knowledgeBaseData}
                      onChange={(data, valid) => {
                        setKnowledgeBaseData(data);
                        setKnowledgeBaseValid(valid);
                      }}
                      onNext={() => setTab('channels-integrations')}
                      onCancel={() => router.push('/ai-agents')}
                    />
                  )}
                  {tab === 'channels-integrations' && (
                    <ChannelsIntegrationsStep
                      allStepData={{
                        basicInfo: { ...basicInfoData },
                        promptBehavior: { ...promptBehaviorData },
                        knowledgeBase: { ...knowledgeBaseData },
                      }}
                      onCancel={() => router.push('/ai-agents')}
                      mode={isEditMode ? 'edit' : 'create'}
                      onSave={isEditMode ? (updatedAgent => {
                        if (agentId) {
                          updateAgent(agentId, updatedAgent);
                          router.push('/ai-agents');
                        }
                      }) : undefined}
                    />
                  )}
                </div>
              );
            }}
          </CreateAgentFormTabs>
        </div>
      </div>
    </MainLayout>
  );
} 