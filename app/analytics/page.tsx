'use client';

import MainLayout from '../components/layout/MainLayout';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Spinner from '../components/ui/Spinner';

const StatCards = dynamic(() => import('./components/StatCards'), { ssr: false, loading: () => <Spinner /> });
const AnalyticsTabs = dynamic(() => import('./components/AnalyticsTabs'), { ssr: false, loading: () => <Spinner /> });

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
        <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
        <div className="space-y-6">
          <Suspense fallback={<Spinner />}>
            <StatCards />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <AnalyticsTabs />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
} 