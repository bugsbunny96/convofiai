'use client';

import { useState } from 'react';
import { type Conversation } from '@/app/contexts/useChatStore';

interface NotesTabProps {
  conversation: Conversation;
}

export default function NotesTab({ conversation }: NotesTabProps) {
  const [notes, setNotes] = useState<string>('');

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    // In a real app, you'd want to debounce this and save to backend
    localStorage.setItem(`notes-${conversation.id}`, e.target.value);
  };

  // Load notes from localStorage on mount
  useState(() => {
    const savedNotes = localStorage.getItem(`notes-${conversation.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  });

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg">
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add notes about this conversation..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    </div>
  );
} 