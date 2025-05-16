export function AgentCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col min-h-[320px] animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="h-5 w-20 rounded bg-gray-200" />
      </div>
      <div className="mb-4">
        <div className="h-5 w-32 rounded bg-gray-200 mb-2" />
        <div className="h-4 w-48 rounded bg-gray-100" />
      </div>
      <div className="mb-4">
        <div className="h-4 w-16 rounded bg-gray-100 mb-1" />
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-full bg-gray-100" />
          <div className="h-6 w-20 rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="mb-6">
        <div className="h-4 w-12 rounded bg-gray-100 mb-1" />
        <div className="h-8 w-10 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-100 mt-1" />
      </div>
      <div className="flex gap-2 mt-auto">
        <div className="h-10 w-24 rounded-lg bg-gray-200" />
        <div className="h-10 w-28 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
} 