import { useEffect, useState } from 'react';
import LineChart from '../../../components/dashboard/LineChart';

const mockData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  total: [24, 32, 30, 38, 33, 20, 14],
  sales: [10, 13, 12, 15, 13, 8, 6],
  support: [8, 11, 10, 12, 11, 7, 5],
};

export default function AgentPerformanceTab() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Agent Performance</h2>
      <div className="mb-4">
        {loading ? (
          <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
        ) : (
          <div className="overflow-x-auto">
            <LineChart
              title="Conversations by Agent"
              data={mockData.total}
              labels={mockData.labels}
            />
          </div>
        )}
        {/* Custom Legend */}
        <div className="flex flex-wrap gap-4 mt-2 ml-2 text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-2 rounded bg-blue-400 inline-block" /> total</div>
          <div className="flex items-center gap-2"><span className="w-3 h-2 rounded bg-green-400 inline-block" /> Sales Agent</div>
          <div className="flex items-center gap-2"><span className="w-3 h-2 rounded bg-yellow-400 inline-block" /> Support Bot</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Response Time Card */}
        <div className="bg-gray-50 rounded-lg p-5 min-h-[120px]">
          <h3 className="font-medium text-gray-700 mb-2">Response Time</h3>
          {loading ? (
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="text-2xl font-semibold">1m 32s</div>
          )}
          <div className="text-xs text-gray-400 mt-1">Average response time by agent</div>
        </div>
        {/* Resolution Rate Card */}
        <div className="bg-gray-50 rounded-lg p-5 min-h-[120px]">
          <h3 className="font-medium text-gray-700 mb-2">Resolution Rate</h3>
          {loading ? (
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="text-2xl font-semibold">92.4%</div>
          )}
          <div className="text-xs text-gray-400 mt-1">Issue resolution rate by agent</div>
        </div>
      </div>
    </div>
  );
} 