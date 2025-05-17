'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface BasicInfoData {
  name: string;
  description: string;
  active: boolean;
  avatar: string | null;
}

interface BasicInfoStepProps {
  onNext: () => void;
  value?: Partial<BasicInfoData>;
  onChange?: (data: BasicInfoData, valid: boolean) => void;
}

const isStepValid = (data: BasicInfoData) => {
  return data.name.trim() !== '' && data.description.trim() !== '';
};

const BasicInfoStep: FC<BasicInfoStepProps> = ({ onNext, value, onChange }) => {
  const router = useRouter();
  const [name, setName] = useState(value?.name || '');
  const [description, setDescription] = useState(value?.description || '');
  const [active, setActive] = useState(value?.active || false);
  const [avatar, setAvatar] = useState<string | null>(value?.avatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compose all fields for validation and parent sync
  const allFields: BasicInfoData = {
    name,
    description,
    active,
    avatar,
  };

  useEffect(() => {
    if (onChange) {
      onChange(allFields, isStepValid(allFields));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, active, avatar]);

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

  const handleCancel = () => {
    router.push('/ai-agents');
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid(allFields)) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Form Fields */}
      <div className="flex-1 space-y-6">
        <div>
          <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">
            Agent Name
          </label>
          <input
            type="text"
            id="agentName"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
            placeholder="e.g. Sales Assistant, Support Bot"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
            placeholder="What's this agent's purpose? What can it help with?"
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
        <p className="text-xs text-gray-500 mt-1">
          When active, this agent will be available to respond to messages.
        </p>
      </div>

      {/* Right: Avatar Upload & Pro Tips */}
      <div className="w-full md:w-80 flex flex-col items-center gap-6">
        <div className="w-full flex flex-col items-center border-2 border-dashed border-gray-200 rounded-xl p-6">
          {avatar && (
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
              <Image src={avatar} alt="Agent Avatar" width={96} height={96} className="w-full h-full object-cover rounded-full" />
            </div>
          )}
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
        <div className="w-full bg-primaryLight rounded-lg p-4">
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
          className="px-6 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          disabled={!isStepValid(allFields)}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default BasicInfoStep; 