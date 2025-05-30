'use client';

export default function EmptyChatState() {
  return (
    <div className="flex items-center justify-center" style={{height:'83vh'}}>
      <div className="text-center">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg
            className="h-full w-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
        <p className="mt-1 text-sm text-gray-500">Select a conversation to start chatting</p>
      </div>
    </div>
  );
} 