'use client';

import { type Conversation } from '@/app/contexts/useChatStore';

interface HistoryTabProps {
  conversation: Conversation;
}

export default function HistoryTab({ conversation }: HistoryTabProps) {
  // This would typically fetch conversation history from an API
  const history = [
    {
      id: '1',
      date: 'Mar 12, 2023',
      events: [
        {
          id: '1',
          time: '10:15 AM',
          type: 'message',
          description: 'First contact established',
        },
        {
          id: '2',
          time: '10:20 AM',
          type: 'status',
          description: 'Inquiry about product features',
        },
      ],
    },
    {
      id: '2',
      date: 'Today',
      events: [
        {
          id: '3',
          time: '10:15 AM',
          type: 'message',
          description: 'Follow-up conversation',
        },
        {
          id: '4',
          time: '10:22 AM',
          type: 'status',
          description: 'Demo scheduled',
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {history.map((day, dayIdx) => (
            <li key={day.id}>
              <div className="relative pb-8">
                {dayIdx !== history.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                      <span className="text-xs text-gray-500">{day.date.slice(0, 3)}</span>
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">{day.date}</p>
                      <div className="mt-2 space-y-4">
                        {day.events.map((event) => (
                          <div key={event.id} className="flex items-start space-x-2">
                            <span className="text-xs text-gray-500">{event.time}</span>
                            <p className="text-sm text-gray-700">{event.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 