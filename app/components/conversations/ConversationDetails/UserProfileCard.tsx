'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface UserProfileCardProps {
  name: string;
  email: string;
  location: string;
  avatar?: string;
}

export default function UserProfileCard({ name, email, location, avatar }: UserProfileCardProps) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Esc
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        {avatar ? (
          <Image src={avatar} alt={name} width={64} height={64} className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-medium text-blue-600">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* User Info */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <div className="mt-1 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          </div>
          <button
            type="button"
            className="mt-3 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpen(true)}
            aria-label="View full profile"
          >
            View Full Profile
          </button>
        </div>
      </div>
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative outline-none"
            ref={modalRef}
            tabIndex={0}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close profile modal"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center space-y-4">
              {avatar ? (
                <Image src={avatar} alt={name} width={80} height={80} className="w-20 h-20 rounded-full" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl font-medium text-blue-600">{name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <div className="text-gray-600">{email}</div>
              <div className="text-gray-600">{location}</div>
              {/* Add more fields here as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 