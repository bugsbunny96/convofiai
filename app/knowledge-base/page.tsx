'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import MainLayout from '../components/layout/MainLayout';
import SearchBar from './SearchBar';
import AddContentButton from './AddContentButton';
import KnowledgeBaseTabs from './KnowledgeBaseTabs';
import KnowledgeBaseTable, { KnowledgeBaseItem } from './KnowledgeBaseTable';
import dynamic from 'next/dynamic';
import { KnowledgeBaseData } from '../components/ai-agents/CreateAgentForm/KnowledgeBaseStep';
import { format } from 'date-fns';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

const KnowledgeBaseStep = dynamic(() => import('../components/ai-agents/CreateAgentForm/KnowledgeBaseStep'), { ssr: false });

const MOCK_ITEMS: KnowledgeBaseItem[] = [
  {
    id: '1',
    name: 'Product Features Overview.pdf',
    type: 'Document',
    tags: ['Product', 'Features'],
    assignedTo: ['Sales Agent', 'Support Bot'],
    date: '9/15/2023',
  },
  {
    id: '2',
    name: 'Pricing Information.docx',
    type: 'Document',
    tags: ['Pricing', 'Plans'],
    assignedTo: ['Sales Agent'],
    date: '9/12/2023',
  },
  {
    id: '3',
    name: 'Frequently Asked Questions',
    type: 'Faq',
    tags: ['FAQ', 'Support'],
    assignedTo: ['Support Bot'],
    date: '9/10/2023',
  },
  {
    id: '4',
    name: 'Technical Documentation',
    type: 'Link',
    tags: ['Technical', 'Documentation'],
    assignedTo: ['Support Bot'],
    date: '9/5/2023',
  },
  {
    id: '5',
    name: 'Refund Policy.pdf',
    type: 'Document',
    tags: ['Policy', 'Legal'],
    assignedTo: ['Sales Agent', 'Support Bot'],
    date: '8/28/2023',
  },
];

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'all' | 'documents' | 'faqs' | 'links'>('all');
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<KnowledgeBaseItem[]>(MOCK_ITEMS);
  const [formData, setFormData] = useState<KnowledgeBaseData | null>(null);
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filtering logic
  const filteredItems = items.filter(item => {
    const matchesTab =
      tab === 'all' ||
      (tab === 'documents' && item.type === 'Document') ||
      (tab === 'faqs' && item.type === 'Faq') ||
      (tab === 'links' && item.type === 'Link');
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: items.length,
    documents: items.filter(i => i.type === 'Document').length,
    faqs: items.filter(i => i.type === 'Faq').length,
    links: items.filter(i => i.type === 'Link').length,
  };

  // Validation logic
  const validateForm = (data: KnowledgeBaseData | null): string[] => {
    if (!data) return ['Form is empty.'];
    const errors: string[] = [];
    if (!data.agentName || !data.agentName.trim()) errors.push('Agent Name is required.');
    const hasFile = data.files && data.files.length > 0;
    const hasUrl = data.urls && data.urls.length > 0;
    const hasFaq = data.faqs && data.faqs.some(f => f.question.trim() && f.answer.trim());
    if (!hasFile && !hasUrl && !hasFaq) errors.push('Add at least one file, URL, or FAQ.');
    if (data.faqs && data.faqs.some(f => (f.question && !f.answer) || (!f.question && f.answer))) {
      errors.push('Each FAQ must have both a question and an answer.');
    }
    return errors;
  };

  // Save handler for modal
  const handleSave = () => {
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (errors.length > 0 || !formData) return;
    // Add all files as separate Document items
    const newItems: KnowledgeBaseItem[] = [];
    if (formData.files && formData.files.length > 0) {
      formData.files.forEach(file => {
        newItems.push({
          id: `${Date.now()}-${file.name}`,
          name: file.name,
          type: 'Document',
          tags: [],
          assignedTo: formData.agentName ? [formData.agentName] : [],
          date: format(new Date(), 'M/d/yyyy'),
        });
      });
    }
    // Add all URLs as Link items
    if (formData.urls && formData.urls.length > 0) {
      formData.urls.forEach(url => {
        newItems.push({
          id: `${Date.now()}-${url}`,
          name: url,
          type: 'Link',
          tags: ['Link'],
          assignedTo: formData.agentName ? [formData.agentName] : [],
          date: format(new Date(), 'M/d/yyyy'),
        });
      });
    }
    // Add all FAQs as Faq items
    if (formData.faqs && formData.faqs.length > 0) {
      formData.faqs.forEach(faq => {
        if (faq.question && faq.answer) {
          newItems.push({
            id: `${Date.now()}-${faq.question}`,
            name: faq.question,
            type: 'Faq',
            tags: ['FAQ'],
            assignedTo: formData.agentName ? [formData.agentName] : [],
            date: format(new Date(), 'M/d/yyyy'),
          });
        }
      });
    }
    setItems(prev => [...newItems, ...prev]);
    setShowModal(false);
    setFormData(null);
    setFormValid(false);
    setFormErrors([]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  // Edit handler
  const handleEdit = (item: KnowledgeBaseItem) => {
    setShowModal(true);
    // Map item to KnowledgeBaseData for modal
    setFormData({
      files: [],
      urls: item.type === 'Link' ? [item.name] : [],
      faqs: item.type === 'Faq' ? [{ question: item.name, answer: '' }] : [],
      agentName: item.assignedTo[0] || '',
    });
    setFormValid(true);
  };

  // Delete handler
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  // Accessibility: trap focus in modal
  useEffect(() => {
    if (!showModal) return;
    const focusable = modalRef.current?.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable?.[0] as HTMLElement;
    const last = focusable?.[focusable.length - 1] as HTMLElement;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowModal(false);
      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [showModal]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl text-gray-800 font-semibold mb-6">Knowledge Base</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <SearchBar value={search} onChange={setSearch} />
          <AddContentButton onClick={() => setShowModal(true)} />
        </div>
        <KnowledgeBaseTabs currentTab={tab} onTabChange={t => setTab(t as 'all' | 'documents' | 'faqs' | 'links')} counts={counts} />
        <div className="bg-white rounded-lg shadow p-0">
          <KnowledgeBaseTable
            items={filteredItems}
            renderActions={item => (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary">
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                  <span className="sr-only">Actions</span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleEdit(item)}
                            className={`$${active ? 'bg-gray-100' : ''} flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700`}
                          >
                            <PencilIcon className="h-4 w-4" /> Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleDelete(item.id)}
                            className={`$${active ? 'bg-gray-100' : ''} flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600`}
                          >
                            <TrashIcon className="h-4 w-4" /> Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          />
        </div>
        {/* Modal for Add Content */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div ref={modalRef} className="bg-white rounded-xl shadow-lg p-6 pt-12 w-full max-w-4xl relative outline-none" tabIndex={-1} aria-modal="true" role="dialog">
              <button
                className="absolute top-3 right-3 bg-red-100 rounded-full p-1 text-red-400 hover:text-red-600"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <KnowledgeBaseStep
                onNext={() => {}}
                onCancel={() => setShowModal(false)}
                onChange={(data, valid) => {
                  setFormData(data);
                  setFormValid(valid);
                  setFormErrors([]);
                }}
                hideActions={true}
              />
              {formErrors.length > 0 && (
                <div className="mt-4 text-red-600 text-sm space-y-1">
                  {formErrors.map((err, i) => <div key={i}>{err}</div>)}
                </div>
              )}
              <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                  disabled={!formValid}
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            Content saved successfully!
          </div>
        )}
      </div>
    </MainLayout>
  );
} 