"use client";

import { FC, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAgents } from "@/app/hooks/useAgents";
import { Agent } from "@/app/types/models";
import { KnowledgeBaseData } from "./KnowledgeBaseStep";
import { BasicInfoData } from "./BasicInfoStep";
import Image from "next/image";

interface PromptBehaviorData {
  systemPrompt: string;
  communicationTone: string;
  fallbackBehavior: string;
  agentName: string;
  active: boolean;
  temperature: number;
  maxTokens: number;
}

interface ChannelsIntegrationsStepProps {
  onCancel?: () => void;
  allStepData: {
    basicInfo: BasicInfoData;
    promptBehavior: PromptBehaviorData;
    knowledgeBase: KnowledgeBaseData;
    channelsIntegrations?: unknown;
  };
  mode?: 'create' | 'edit';
  onSave?: (agent: Agent) => void;
}

const defaultAvatar = "https://i.pravatar.cc/150?img=13";

const INTEGRATIONS = [
  {
    key: "website-chat",
    name: "Website Chat",
    description: "Deploy this agent to website chat",
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    description: "Deploy this agent to WhatsApp",
  },
  {
    key: "instagram-dm",
    name: "Instagram DM",
    description: "Deploy this agent to Instagram DM",
  },
  {
    key: "facebook-messenger",
    name: "Facebook Messenger",
    description: "Deploy this agent to Facebook Messenger",
  },
  {
    key: "sms",
    name: "SMS",
    description: "Deploy this agent to SMS",
  },
];

const ChannelsIntegrationsStep: FC<ChannelsIntegrationsStepProps> = ({ onCancel, allStepData, mode = 'create', onSave }) => {
  const router = useRouter();
  const { addAgent } = useAgents();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compose agent data from all steps
  const { basicInfo, promptBehavior, knowledgeBase } = allStepData;
  const [avatar, setAvatar] = useState<string | null>(basicInfo?.avatar || null);
  const [enabledIntegrations, setEnabledIntegrations] = useState<Record<string, boolean>>({});

  // Handle toggle
  const handleToggle = (key: string) => {
    setEnabledIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle avatar upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Compose agent fields
  const name = basicInfo?.name || promptBehavior?.agentName || "Untitled Agent";
  const description = basicInfo?.description || promptBehavior?.systemPrompt || "";
  const skills: string[] = [];
  if (promptBehavior?.communicationTone) skills.push(promptBehavior.communicationTone);
  if (knowledgeBase?.files?.length) skills.push("Documents");
  if (knowledgeBase?.urls?.length) skills.push("Website URLs");
  if (knowledgeBase?.faqs?.length) skills.push("FAQs");
  // Add enabled integrations as skills
  Object.entries(enabledIntegrations).forEach(([key, enabled]) => {
    if (enabled) {
      const integration = INTEGRATIONS.find((i) => i.key === key);
      if (integration) skills.push(integration.name);
    }
  });
  const avatarUrl = avatar || defaultAvatar;
  const status: Agent["status"] = basicInfo?.active ? "active" : "inactive";
  const createdAt = new Date().toISOString();

  // Create agent object for creation (no id)
  const newAgentForCreate = {
    name,
    description,
    skills,
    avatarUrl,
    status,
    createdAt,
    model: 'gpt-4',
    temperature: promptBehavior?.temperature ?? 0.7,
    maxTokens: promptBehavior?.maxTokens ?? 2000,
    channels: Object.entries(enabledIntegrations)
      .filter((entry) => entry[1])
      .map(([key]) => {
        const integration = INTEGRATIONS.find(i => i.key === key);
        return integration ? integration.name : key;
      }),
  };

  // Create agent object for edit (with id)
  const newAgent: Agent = {
    id: Date.now().toString(),
    ...newAgentForCreate,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && onSave) {
      onSave(newAgent);
    } else {
      addAgent(newAgentForCreate);
      router.push("/ai-agents");
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.push("/ai-agents");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Integrations List */}
        <div className="flex-1 space-y-6">
          {INTEGRATIONS.map((integration) => (
            <div key={integration.key} className="flex items-center justify-between border border-gray-200 rounded-xl px-6 py-4 bg-white mb-2">
              <div>
                <div className="text-base font-semibold text-gray-900">{integration.name}</div>
                <div className="text-sm text-gray-500">{integration.description}</div>
              </div>
              <button
                type="button"
                aria-pressed={!!enabledIntegrations[integration.key]}
                onClick={() => handleToggle(integration.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabledIntegrations[integration.key] ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabledIntegrations[integration.key] ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          ))}
          {/* Coming Soon Card */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 mt-6">
            <div className="flex flex-col items-center">
              <div className="relative w-12 h-12 flex items-center justify-center mb-2">
                {/* Animated wave */}
                <span className="absolute inset-0 rounded-full animate-wave bg-primary opacity-60"></span>
                {/* Static blue dot */}
                <span className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold z-10">
                  <span className="opacity-90">○</span>
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Coming Soon</div>
              <div className="text-sm text-gray-500 mb-3 text-center">Zapier, Google Sheets, HubSpot, and more integrations are on the way!</div>
              <button type="button" className="px-4 py-1 rounded bg-gray-200 text-gray-700 text-xs font-medium cursor-default" disabled>Future Release</button>
            </div>
          </div>
        </div>
        {/* Right Sidebar: Avatar & Pro Tips */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          {/* Agent Avatar */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center bg-white">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold mb-4 overflow-hidden">
              {avatar && (
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src={avatar} alt="Agent Avatar" width={96} height={96} className="w-full h-full object-cover rounded-full" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium mb-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload image
            </button>
            <span className="text-xs text-gray-400">Recommended: 256×256px</span>
          </div>
          {/* Pro Tips */}
          <div className="bg-primaryLight rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-900">Pro Tips</h3>
            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
              <li>Give your agent a descriptive name that reflects its Purpose</li>
              <li>Add a clear description to help your team understand what this agent does</li>
              <li>Upload a unique avatar to differentiate between agents</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom: Actions */}
      <div className="flex justify-end gap-3 mt-8 border-t pt-4">
        <button
          type="button"
          className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium hover:bg-gray-50 transition"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          {mode === 'edit' ? 'Save' : 'Create Agent'}
        </button>
      </div>
    </form>
  );
};

export default ChannelsIntegrationsStep; 