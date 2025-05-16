import { useEffect, useState, ReactElement } from 'react';
import StatCard from '@/app/components/dashboard/StatCard';
import Spinner from '@/app/components/ui/Spinner';
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

interface StatCardData {
  title: string;
  value: string | number;
  change: { value: number; trend: 'up' | 'down' };
  icon: ReactElement;
}

const mockStats: StatCardData[] = [
  {
    title: 'Total Conversations',
    value: 248,
    change: { value: 12, trend: 'up' },
    icon: <ChatBubbleLeftRightIcon className="w-7 h-7" />,
  },
  {
    title: 'Leads Captured',
    value: 73,
    change: { value: 8, trend: 'up' },
    icon: <UserGroupIcon className="w-7 h-7" />,
  },
  {
    title: 'Conversion Rate',
    value: '18.2%',
    change: { value: 2, trend: 'down' },
    icon: <ChartBarIcon className="w-7 h-7" />,
  },
  {
    title: 'Response Rate',
    value: '97.5%',
    change: { value: 1.5, trend: 'up' },
    icon: <CalendarDaysIcon className="w-7 h-7" />,
  },
];

export default function StatCards() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatCardData[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center mb-4"><Spinner /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm animate-pulse h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
} 