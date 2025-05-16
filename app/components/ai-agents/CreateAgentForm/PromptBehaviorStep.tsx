'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AgentFormData {
  systemPrompt: string;
  communicationTone: string;
  fallbackBehavior: string;
  agentName: string;
  active: boolean;
  temperature: number;
  maxTokens: number;
}

interface PromptBehaviorStepProps {
  onNext: () => void;
  onCancel?: () => void;
  value?: Partial<AgentFormData>;
  onChange?: (data: AgentFormData, valid: boolean) => void;
}

const communicationTones = [
  { label: 'Professional', value: 'professional' },
  { label: 'Friendly', value: 'friendly' },
  { label: 'Casual', value: 'casual' },
];
const fallbackBehaviors = [
  { label: 'Professional', value: 'professional' },
  { label: 'Fallback', value: 'fallback' },
];

const isStepValid = (data: AgentFormData) => {
  return (
    data.systemPrompt.trim() !== '' &&
    data.agentName.trim() !== '' &&
    data.communicationTone.trim() !== '' &&
    data.fallbackBehavior.trim() !== '' &&
    typeof data.temperature === 'number' &&
    typeof data.maxTokens === 'number'
  );
};

const PromptBehaviorStep: FC<PromptBehaviorStepProps> = ({ onNext, onCancel, value, onChange }) => {
  const router = useRouter();
  const [systemPrompt, setSystemPrompt] = useState(value?.systemPrompt || 'You are a helpful assistant for our company. Your goal is to answer customer questions accurately and professionally.');
  const [communicationTone, setCommunicationTone] = useState(value?.communicationTone || 'professional');
  const [fallbackBehavior, setFallbackBehavior] = useState(value?.fallbackBehavior || 'professional');
  const [agentName, setAgentName] = useState(value?.agentName || '');
  const [active, setActive] = useState(value?.active || false);
  const [temperature, setTemperature] = useState(value?.temperature ?? 0.5);
  const [maxTokens, setMaxTokens] = useState(value?.maxTokens ?? 800);
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  // Compose all fields for validation and parent sync
  const allFields: AgentFormData = {
    systemPrompt,
    communicationTone,
    fallbackBehavior,
    agentName,
    active,
    temperature,
    maxTokens,
  };

  // Sync to parent on any change
  useEffect(() => {
    if (onChange) {
      onChange(allFields, isStepValid(allFields));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemPrompt, communicationTone, fallbackBehavior, agentName, active, temperature, maxTokens]);

  // Simulate test response
  const handleTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestResponse('This is a simulated AI response.');
      setIsTesting(false);
    }, 1000);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid(allFields)) {
      onNext();
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.push('/ai-agents');
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form */}
        <div className="flex-1 space-y-6">
          <div>
            <label htmlFor="systemPrompt" className="text-sm font-medium text-gray-700 flex items-center justify-between">
              System Prompt
              <span className="text-xs text-gray-400 font-normal">Instructions give to the AI</span>
            </label>
            <textarea
              id="systemPrompt"
              rows={3}
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Communication Tone</label>
              <div className="flex flex-wrap flex-col gap-2">
                {communicationTones.map(tone => (
                  <button
                    key={tone.value}
                    type="button"
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium transition ${communicationTone === tone.value ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setCommunicationTone(tone.value)}
                  >
                    <span className="inline-block w-4 h-4 bg-gray-200 rounded-full" />
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fallback Behavior</label>
              <div className="flex flex-wrap flex-col gap-2">
                {fallbackBehaviors.map(fb => (
                  <button
                    key={fb.value}
                    type="button"
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium transition ${fallbackBehavior === fb.value ? 'bg-primary text-white border-primary' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setFallbackBehavior(fb.value)}
                  >
                    <span className="inline-block w-4 h-4 bg-gray-200 rounded-full" />
                    {fb.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Agent Name</label>
            <input
              type="text"
              id="agentName"
              value={agentName}
              onChange={e => setAgentName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              placeholder="e.g. Sales Assistant, Support Bot"
              required
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-medium text-gray-700">Make this agent active</span>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => setActive(a => !a)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${active ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${active ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-0 mb-2">
            When active, this agent will be available to respond to messages.
          </p>
          <div className="flex flex-wrap flex-col gap-6 items-center">
            <div className="my-1 w-full">
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">Temperature (Creativity)</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Precise</span>
                <input
                  type="range"
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.01}
                  value={temperature}
                  onChange={e => setTemperature(parseFloat(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="text-xs text-gray-400">Creative</span>
                <span className="ml-2 text-xs text-gray-700 font-medium">{temperature}</span>
              </div>
            </div>
            <div className="my-1 w-full">
              <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700 mb-1">Response Length (Max Tokens)</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Shorter</span>
                <input
                  type="range"
                  id="maxTokens"
                  min={100}
                  max={2000}
                  step={10}
                  value={maxTokens}
                  onChange={e => setMaxTokens(parseInt(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="text-xs text-gray-400">Longer</span>
                <span className="ml-2 text-xs text-gray-700 font-medium">{maxTokens}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Test Agent & Tips */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-2">
            <h3 className="text-base font-semibold mb-2 text-gray-900">Test Agent</h3>
            <label htmlFor="testMessage" className="block text-xs font-medium text-gray-500 mb-1">Your Message</label>
            <textarea
              id="testMessage"
              rows={3}
              value={testMessage}
              onChange={e => setTestMessage(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm mb-2"
              placeholder="Enter a test message..."
            />
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition mb-2"
              onClick={handleTest}
              disabled={isTesting || !testMessage.trim()}
            >
              <span className="inline-block w-4 h-4 bg-gray-200 rounded-full" />
              Test Response
            </button>
            {testResponse && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700 border border-gray-100">{testResponse}</div>
            )}
          </div>
          <div className="bg-primaryLight rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-900">Behavior Tips</h3>
            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
              <li>Higher temperature (0.7+)&nbsp;creates more creative responses</li>
              <li>Lower temperature (0.3-0.5) ensures factually accurate answers</li>
              <li>Be specific in your system prompt about how the AI should respond</li>
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
          className="px-6 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          disabled={!isStepValid(allFields)}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default PromptBehaviorStep; 