import { useState, Suspense, lazy } from 'react';
import Tabs from '../../components/ui/Tabs';
import Spinner from '../../components/ui/Spinner';

const AgentPerformanceTab = lazy(() => import('./tabs/AgentPerformanceTab'));
const ChannelInsightsTab = lazy(() => import('./tabs/ChannelInsightsTab'));
const ConversionTrendsTab = lazy(() => import('./tabs/ConversionTrendsTab'));

const TAB_LABELS = ['Agent Performance', 'Channel Insights', 'Conversion Trends'];

export default function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState(TAB_LABELS[0]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs tabs={TAB_LABELS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6 min-h-[400px]">
        <Suspense fallback={<Spinner />}>
          {activeTab === 'Agent Performance' && <AgentPerformanceTab />}
          {activeTab === 'Channel Insights' && <ChannelInsightsTab />}
          {activeTab === 'Conversion Trends' && <ConversionTrendsTab />}
        </Suspense>
      </div>
    </div>
  );
} 