import React from 'react';
import { motion } from 'framer-motion';

/**
 * Export format tabs for selecting export type.
 */
export interface ExportTabsProps {
  format: string;
  setFormat: (f: string) => void;
  loading?: boolean;
}

const exportFormats = [
  { id: 'csv', label: 'CSV', tooltip: 'Export as CSV file' },
  { id: 'sheets', label: 'Sheets', tooltip: 'Export to Google Sheets' },
  { id: 'notion', label: 'Notion', tooltip: 'Export to Notion' },
];

export const ExportTabs: React.FC<ExportTabsProps> = ({ format, setFormat, loading }) => (
  <div className="flex gap-1 bg-gray-100 rounded-md p-1">
    {exportFormats.map(f => (
      <motion.button
        key={f.id}
        className={`relative px-3 py-1 rounded-md text-sm font-medium transition-colors ${format === f.id ? 'bg-white shadow text-primary' : 'text-gray-600 hover:bg-gray-200'}`}
        onClick={() => setFormat(f.id)}
        type="button"
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        title={f.tooltip}
      >
        {f.label}
        {format === f.id && (
          <motion.span layoutId="exportTabActive" className="absolute inset-0 rounded-md bg-primary/10 z-[-1]" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
        )}
      </motion.button>
    ))}
  </div>
);

export default ExportTabs; 