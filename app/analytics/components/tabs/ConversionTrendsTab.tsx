import { useEffect, useState } from 'react';
import LineChart from '../../../components/dashboard/LineChart';

const mockData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  rate: [16, 18, 17, 19, 18, 15, 14],
  leads: [8, 10, 9, 12, 11, 7, 6],
};

export default function ConversionTrendsTab() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Conversion Trends</h2>
      <div className="mb-4">
        {loading ? (
          <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
        ) : (
          <div className="overflow-x-auto">
            <LineChart
              title="Conversion Rate & Leads Generated"
              data={mockData.rate}
              labels={mockData.labels}
            />
          </div>
        )}
        {/* Custom Legend */}
        <div className="flex flex-wrap gap-4 mt-2 ml-2 text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-2 rounded bg-blue-400 inline-block" /> rate</div>
          <div className="flex items-center gap-2"><span className="w-3 h-2 rounded bg-green-400 inline-block" /> Lead Generated</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Lead Source Card */}
        <div className="bg-gray-50 rounded-lg p-5 min-h-[120px]">
          <h3 className="font-medium text-gray-700 mb-2">Lead Source</h3>
          {loading ? (
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="text-base font-semibold">Website Chat, WhatsApp, Messenger</div>
          )}
          <div className="text-xs text-gray-400 mt-1">Distribution of lead source</div>
        </div>
        {/* Average Deal Size Card */}
        <div className="bg-gray-50 rounded-lg p-5 min-h-[120px]">
          <h3 className="font-medium text-gray-700 mb-2">Average Deal Size</h3>
          {loading ? (
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="text-2xl font-semibold">$1,250</div>
          )}
          <div className="text-xs text-gray-400 mt-1">Average value of converted leads</div>
        </div>
      </div>
    </div>
  );
} 