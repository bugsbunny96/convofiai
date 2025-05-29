'use client';

import { type Conversation, type Message } from '@/app/contexts/useChatStore';
import useChatStore from '@/app/contexts/useChatStore';
import { useMemo } from 'react';

interface HistoryTabProps {
  conversation: Conversation;
}

interface HistoryEvent {
  id: string;
  time: string;
  type: 'message' | 'status';
  description: string;
}

interface HistoryDay {
  id: string;
  date: string;
  events: HistoryEvent[];
}

export default function HistoryTab({ conversation }: HistoryTabProps) {
  const {
    messagesByConversation,
  } = useChatStore();
  const messages = useMemo(() => messagesByConversation[conversation.id] || [], [messagesByConversation, conversation.id]);


  console.log()

  // Group messages by date
  const history = messages.reduce((acc: HistoryDay[], message: Message) => {
    const date = new Date(message.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const existingDay = acc.find(day => day.date === date);
    if (existingDay) {
      existingDay.events.push({
        id: message.id,
        time: new Date(message.timestamp).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        }),
        type: 'message',
        description: message.content
      });
    } else {
      acc.push({
        id: date,
        date,
        events: [{
          id: message.id,
          time: new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          }),
          type: 'message',
          description: message.content
        }]
      });
    }
    return acc;
  }, []);

  if (history.length === 0) {
    return (
      <div className="p-3 sm:p-4 text-center text-sm sm:text-base text-gray-500">
        No conversation history available
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4">
      <div className="flow-root">
        <ul role="list" className="-mb-6 sm:-mb-8">
          {history.map((day: HistoryDay, dayIdx: number) => (
            <li key={day.id}>
              <div className="relative pb-6 sm:pb-8">
                {dayIdx !== history.length - 1 ? (
                  <span
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-2 sm:space-x-3">
                  <div>
                    <span className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-200 flex items-center justify-center ring-6 sm:ring-8 ring-white">
                      <span className="text-[10px] sm:text-xs text-gray-500">{day.date.slice(0, 3)}</span>
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-3 sm:space-x-4 pt-1 sm:pt-1.5">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">{day.date}</p>
                      <div className="mt-1.5 sm:mt-2 space-y-3 sm:space-y-4">
                        {day.events.map((event: HistoryEvent) => (
                          <div key={event.id} className="flex items-start space-x-1.5 sm:space-x-2">
                            <span className="text-[10px] sm:text-xs text-gray-500">{event.time}</span>
                            <p className="text-xs sm:text-sm text-gray-700">{event.description}</p>
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