'use client';

import { useEffect, useState } from 'react';
import { type Conversation } from '@/app/contexts/useChatStore';
import { fetchNotes, saveNotes } from '@/lib/api';

interface NotesTabProps {
  conversation: Conversation;
}

export default function NotesTab({ conversation }: NotesTabProps) {
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNotes(conversation.id)
      .then((data) => setNotes(data?.notes || ''))
      .catch(() => setError('Failed to load notes'))
      .finally(() => setLoading(false));
  }, [conversation.id]);

  const handleNotesChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value); // Optimistic UI
    setSaving(true);
    setSaveError(null);
    try {
      await saveNotes(conversation.id, value);
    } catch {
      setSaveError('Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-3 sm:p-4 text-sm sm:text-base text-gray-500">Loading notes...</div>;
  }
  if (error) {
    return <div className="p-3 sm:p-4 text-sm sm:text-base text-red-500">{error}</div>;
  }

  return (
    <div className="p-3 sm:p-4">
      <div className="bg-white rounded-lg">
        <label htmlFor="notes-textarea" className="sr-only">Notes</label>
        <textarea
          id="notes-textarea"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add notes about this conversation..."
          className="w-full h-40 sm:h-48 p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          aria-label="Conversation notes"
        />
        {saving && <div className="text-xs sm:text-sm text-gray-400 mt-1.5 sm:mt-2">Saving...</div>}
        {saveError && <div className="text-xs sm:text-sm text-red-500 mt-1.5 sm:mt-2">{saveError}</div>}
      </div>
    </div>
  );
} 