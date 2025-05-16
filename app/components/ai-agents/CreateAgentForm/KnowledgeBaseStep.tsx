"use client";

import { FC, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface KnowledgeBaseData {
  files: File[];
  urls: string[];
  faqs: FAQItem[];
  agentName: string;
}

interface KnowledgeBaseStepProps {
  onNext: () => void;
  onCancel?: () => void;
  value?: Partial<KnowledgeBaseData>;
  onChange?: (data: KnowledgeBaseData, valid: boolean) => void;
  hideActions?: boolean;
}

const isStepValid = () => {
  // All fields are optional, always return true
  return true;
};

const KnowledgeBaseStep: FC<KnowledgeBaseStepProps> = ({ onNext, onCancel, value, onChange, hideActions }) => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>(value?.files || []);
  const [urls, setUrls] = useState<string[]>(value?.urls || []);
  const [faqs, setFaqs] = useState<FAQItem[]>(value?.faqs || [{ question: "", answer: "" }]);
  const [agentName, setAgentName] = useState(value?.agentName || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compose all fields for validation and parent sync
  const allFields: KnowledgeBaseData = {
    files,
    urls,
    faqs,
    agentName,
  };

  useEffect(() => {
    if (onChange) {
      onChange(allFields, isStepValid());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, urls, faqs, agentName]);

  // File upload logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // URLs logic
  const handleUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(e.target.value.split("\n").map((u) => u.trim()).filter(Boolean));
  };

  // FAQ logic
  const handleFaqChange = (idx: number, field: "question" | "answer", value: string) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };
  const addFaq = () => setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const removeFaq = (idx: number) => setFaqs((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);

  // Form actions
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid()) {
      onNext();
    }
  };
  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.push('/ai-agents');
  };

  // Knowledge Sources counts
  const docCount = files.length;
  const urlCount = urls.length;
  const faqCount = faqs.filter(f => f.question.trim() && f.answer.trim()).length;

  return (
    <form onSubmit={handleNext}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form */}
        <div className="flex-1 space-y-6">
          {/* File Upload */}
          <div className="cursor-pointer border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center mb-2 bg-gray-50 hover:bg-gray-100 transition" onClick={() => fileInputRef.current?.click()}>
            <span className="text-lg font-semibold mb-2">Upload Knowledge Base Files</span>
            <span className="text-sm text-gray-500 mb-4">Drag and drop files here or click to browse. Supported formats: PDF, DOCX, TXT.</span>
            <CloudArrowUpIcon className="inline-block w-9 h-9 text-blue-500" />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <div className="mt-4 w-full">
                <ul className="text-xs text-gray-700">
                  {files.map((file, idx) => (
                    <li key={idx} className="truncate">{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Website URLs */}
          <div>
            <label htmlFor="urls" className="block text-sm font-medium text-gray-700 mb-1">Website URLs to Crawl</label>
            <textarea
              id="urls"
              rows={3}
              value={urls.join("\n")}
              onChange={handleUrlsChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              placeholder="https://example.com/page-1\nhttps://example.com/page-2"
            />
            <span className="text-xs text-gray-400">One URL per line. ConvofyAI will crawl these pages to gather information.</span>
          </div>

          {/* Agent Name */}
          <div>
            <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Agent Name</label>
            <input
              type="text"
              id="agentName"
              value={agentName}
              onChange={e => setAgentName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              placeholder="e.g. Sales Assistant, Support Bot"
            />
          </div>

          {/* FAQs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add FAQs</label>
            <span className="text-xs text-gray-400 mb-2 block">Add frequently asked questions that this agent should know how to answer.</span>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-2 items-start">
                  <div className="flex-1">
                    <span className="text-xs text-gray-600 mt-1 block">Question</span>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={e => handleFaqChange(idx, "question", e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 mb-1"
                      placeholder="e.g., What are your business hours?"
                    />
                    <span className="text-xs text-gray-600 mt-4 block">Answer</span>
                    <input
                      type="text"
                      value={faq.answer}
                      onChange={e => handleFaqChange(idx, "answer", e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
                      placeholder="e.g., Our business hours are Monday-Friday, 9am-5pm Eastern time."
                    />
                  </div>
                  {faqs.length > 1 && (
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium"
                      onClick={() => removeFaq(idx)}
                    >
                      <TrashIcon className="inline-block w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-1 rounded bg-primary text-white font-medium hover:bg-primary/90 text-xs"
                onClick={addFaq}
              >
                + Add FAQ
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-2">
            <h3 className="text-sm font-semibold mb-2 text-gray-900">Knowledge Sources</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium">Documents</span>
                <span className="text-xs text-gray-500">{docCount > 0 ? docCount : "None yet"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-medium">Website URLs</span>
                <span className="text-xs text-gray-500">{urlCount > 0 ? urlCount : "None yet"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium">FAQs</span>
                <span className="text-xs text-gray-500">{faqCount > 0 ? faqCount : "None yet"}</span>
              </div>
            </div>
          </div>
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
      {!hideActions && (
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
            disabled={false}
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
};

export default KnowledgeBaseStep; 