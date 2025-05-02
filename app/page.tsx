'use client';

import MainLayout from './components/layout/MainLayout';
import StatCard from './components/dashboard/StatCard';
import LineChart from './components/dashboard/LineChart';
import StatusList from './components/dashboard/StatusList';
import {
  ChatBubbleLeftRightIcon,
  UserIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

// Sample data - replace with real data
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const conversationData = [4, 10, 8, 15, 20, 12, 5];
const leadsData = [3, 8, 6, 12, 15, 8, 3];

const agentStatus = [
  {
    icon: <UserGroupIcon className="w-6 h-6" />,
    name: 'Sales Agent',
    status: 'AI',
    conversations: 24,
    responseRate: 98,
    isActive: true
  },
  {
    icon: <UserGroupIcon className="w-6 h-6" />,
    name: 'Support Bot',
    status: 'AI',
    conversations: 18,
    responseRate: 96,
    isActive: true
  },
  {
    icon: <UserIcon className="w-6 h-6" />,
    name: 'John Doe',
    status: 'Human',
    conversations: 0,
    responseRate: 92,
    isActive: false
  }
];

const channelStatus = [
  {
    icon: <ChatBubbleLeftIcon className="w-6 h-6" />,
    name: 'Website Chat',
    conversations: 32,
    isActive: true
  },
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    name: 'WhatsApp',
    conversations: 18,
    isActive: true
  },
  {
    icon: <ChatBubbleOvalLeftIcon className="w-6 h-6" />,
    name: 'Messenger',
    conversations: 0,
    isActive: false
  },
  {
    icon: <PhotoIcon className="w-6 h-6" />,
    name: 'Instagram',
    conversations: 0,
    isActive: false
  }
];

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Conversations"
            value="248"
            change={{ value: 12, trend: 'up' }}
            icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
          />
          <StatCard
            title="Leads Captured"
            value="73"
            change={{ value: 8, trend: 'up' }}
            icon={<UserIcon className="w-6 h-6" />}
          />
          <StatCard
            title="Conversion Rate"
            value="18.2%"
            change={{ value: 2, trend: 'down' }}
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          <StatCard
            title="Active Agents"
            value="2/3"
            change={{ value: 0, trend: 'up' }}
            icon={<UserGroupIcon className="w-6 h-6" />}
          />
        </div>

        {/* Charts and Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LineChart
              title="Conversations Overview"
              data={conversationData}
              labels={weekDays}
            />
            <LineChart
              title="Leads Captured"
              data={leadsData}
              labels={weekDays}
          />
          </div>
          <div className="space-y-6">
            <StatusList title="Agent Status" items={agentStatus} />
            <StatusList title="Channel Status" items={channelStatus} />
          </div>
        </div>
    </div>
    </MainLayout>
  );
}
