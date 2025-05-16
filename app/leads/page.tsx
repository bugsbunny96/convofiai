'use client';

import { useState, useMemo, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { format } from 'date-fns';
import type { Lead } from '@/app/types/models';
import { LeadStatus, LeadSource } from '@/app/types/models';
import DropdownMenu from '../components/ui/DropdownMenu';
import StatusPill from '../components/ui/StatusPill';
import ExportTabs from '../components/ui/ExportTabs';
import { motion, AnimatePresence } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TableSkeleton from '../components/ui/TableSkeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

// Mock leads data (replace with API call in production)
const mockLeads: Lead[] = [
  {
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 555-123-4567',
    source: LeadSource.WebsiteChat,
    agent: 'Sales Agent',
    date: '2023-10-15',
    status: LeadStatus.New,
  },
  {
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '+1 555-987-6543',
    source: LeadSource.WhatsApp,
    agent: 'Sales Agent',
    date: '2023-10-14',
    status: LeadStatus.Contacted,
  },
  {
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1 555-567-8901',
    source: LeadSource.WebsiteChat,
    agent: 'Support Bot',
    date: '2023-10-13',
    status: LeadStatus.Converted,
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1 555-234-5678',
    source: LeadSource.WhatsApp,
    agent: 'Sales Agent',
    date: '2023-10-12',
    status: LeadStatus.New,
  },
  {
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+1 555-345-6789',
    source: LeadSource.Messenger,
    agent: 'Support Bot',
    date: '2023-10-11',
    status: LeadStatus.Contacted,
  },
];

const statusOptions = ['All Statuses', ...Object.values(LeadStatus)];
const sourceOptions = ['All Sources', ...Object.values(LeadSource)];

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function LeadsPage() {
  const [status, setStatus] = useState<string>(statusOptions[0]);
  const [source, setSource] = useState<string>(sourceOptions[0]);
  const [search, setSearch] = useState('');
  const [exportFormat, setExportFormat] = useState('csv');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [exportLoading, setExportLoading] = useState(false);

  // Simulate API fetch
  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 1200);
  }, []);

  const debouncedSearch = useDebouncedValue(search, 250);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesStatus = status === 'All Statuses' || l.status === status;
      const matchesSource = source === 'All Sources' || l.source === source;
      const matchesSearch =
        l.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        l.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        l.phone.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesStatus && matchesSource && matchesSearch;
    });
  }, [leads, status, source, debouncedSearch]);

  function handleExport(format: string, data: Lead[]): void {
    setExportLoading(true);
    setTimeout(() => {
      if (format === 'csv') {
        const header = ['Name', 'Email', 'Phone', 'Source', 'Agent', 'Date', 'Status'];
        const rows = data.map(l => [l.name, l.email, l.phone, l.source, l.agent, l.date, l.status]);
        const csv = [header, ...rows].map(r => r.map(f => `"${f}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leads.csv';
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert('Export to ' + format + ' coming soon!');
      }
      setExportLoading(false);
    }, 800);
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-500 mt-1">View and manage leads captured from all channels</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 items-start sm:items-center justify-end">
            <DropdownMenu
              options={statusOptions}
              value={status}
              onChange={setStatus}
              label="Status"
              className="min-w-[150px]"
            />
            <DropdownMenu
              options={sourceOptions}
              value={source}
              onChange={setSource}
              label="Source"
              className="min-w-[150px]"
            />
          </div>
        </div>
        {/* Card */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Card Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                className="w-full border text-gray-900 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                placeholder="Search leads..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search leads"
              />
            </div>
            <div className="flex items-center gap-2">
              <ExportTabs format={exportFormat} setFormat={setExportFormat} loading={exportLoading} />
              <button
                className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-md font-medium shadow hover:bg-black/90 transition relative"
                onClick={() => handleExport(exportFormat, filteredLeads)}
                disabled={exportLoading}
                title="Export filtered leads"
                aria-label="Export filtered leads"
              >
                {exportLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                )}
                Export
              </button>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-0" aria-label="Leads table">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Source</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Agent</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <TableSkeleton rowCount={5} colCount={7} />
                ) : error ? (
                  <tr>
                    <td colSpan={7}>
                      <ErrorState message={error} onRetry={() => window.location.reload()} retryLabel="Retry loading leads" />
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState
                        message="No leads found for your filters."
                        icon={<InformationCircleIcon className="w-10 h-10 text-gray-300" />}
                        action={
                          <button
                            className="mt-2 px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition"
                            onClick={() => {
                              setStatus(statusOptions[0]);
                              setSource(sourceOptions[0]);
                              setSearch('');
                            }}
                          >
                            Reset Filters
                          </button>
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredLeads.map((lead, idx) => (
                      <motion.tr
                        key={lead.email}
                        className={
                          'cursor-pointer transition-colors ' +
                          (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') +
                          ' hover:bg-primary/5'
                        }
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, delay: idx * 0.03 }}
                        tabIndex={0}
                        onClick={() => alert(`Lead details for ${lead.name}`)}
                        title={`View details for ${lead.name}`}
                        aria-label={`View details for ${lead.name}`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{lead.phone}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{lead.source}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{lead.agent}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{format(new Date(lead.date), 'MM/dd/yyyy')}</td>
                        <td className="px-4 py-3 whitespace-nowrap"><StatusPill status={lead.status as LeadStatus} /></td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 