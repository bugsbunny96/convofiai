"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAgents } from "@/app/hooks/useAgents";
import MainLayout from "@/app/components/layout/MainLayout";
import { useRouter } from 'next/navigation';
import EmptyState from '@/app/components/ui/EmptyState';
import { Popover } from '@headlessui/react';
import { useState } from 'react';
import Spinner from '@/app/components/ui/Spinner';
import ErrorState from '@/app/components/ui/ErrorState';
import { useToast } from '@/contexts/useToast';
import { Agent } from '@/app/hooks/useAgents';
import { DeleteAgentDialog } from '@/app/components/ai-agents/DeleteAgentDialog';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { AgentCardSkeleton } from '@/app/components/ai-agents/AgentCardSkeleton';

const AgentCard = dynamic(() => import('@/app/components/ai-agents/AgentCard').then(mod => mod.AgentCard), {
  loading: () => <AgentCardSkeleton />,
  ssr: false,
});

export default function AIAgentsPage() {
  const { agents, isLoading, error, deleteAgent, duplicateAgent } = useAgents();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const { toast } = useToast();

  const handleEdit = (id: string) => {
    router.push(`/ai-agents/create?id=${id}`);
  };

  const handleDuplicate = async (id: string) => {
    try {
      await duplicateAgent(id);
      toast({
        title: 'Agent Duplicated',
        description: 'The AI agent has been duplicated successfully.',
        variant: 'success',
      });
    } catch {
      toast({
        title: 'Error Duplicating Agent',
        description: 'Failed to duplicate the AI agent. Please try again.',
        variant: 'error',
      });
    }
  };

  const handleDelete = (agent: Agent) => {
    setAgentToDelete(agent);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (agentToDelete) {
      try {
        await deleteAgent(agentToDelete.id);
        setDeleteDialogOpen(false);
        setAgentToDelete(null);
        toast({
          title: 'Agent Deleted',
          description: 'The AI agent has been deleted successfully.',
          variant: 'success',
        });
      } catch {
        toast({
          title: 'Error Deleting Agent',
          description: 'Failed to delete the AI agent. Please try again.',
          variant: 'error',
        });
      }
    }
  };

  const handleViewLogs = (id: string) => {
    // TODO: Open logs modal
    console.log("View logs for agent:", id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <ErrorState
          message={error.message}
          onRetry={() => window.location.reload()}
          retryLabel="Try Again"
        />
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
              <p className="text-gray-500 mt-1">Create agents with predefined knowledge and tools</p>
            </div>
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-900/90 transition font-medium"
                    onClick={() => router.push('/ai-agents/create')}
                    aria-label="Create new AI agent"
                  >
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M8.00016 15.1668C11.6821 15.1668 14.6668 12.1821 14.6668 8.50016C14.6668 4.81826 11.6821 1.8335 8.00016 1.8335C4.31826 1.8335 1.3335 4.81826 1.3335 8.50016C1.3335 12.1821 4.31826 15.1668 8.00016 15.1668Z" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.3335 8.5H10.6668" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 5.8335V11.1668" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Create Agent
                  </Popover.Button>
                  <Popover.Panel className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <p className="text-sm text-gray-500">Create a new AI agent with custom knowledge and tools</p>
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <AgentCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Empty State */}
              {agents.length === 0 ? (
                <EmptyState
                  message="No AI Agents Yet"
                  icon={<UserCircleIcon className="h-16 w-16 text-primary mb-4" />}
                  action={
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-900/90 transition font-medium"
                      onClick={() => router.push('/ai-agents/create')}
                      aria-label="Create your first AI agent"
                    >
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M8.00016 15.1668C11.6821 15.1668 14.6668 12.1821 14.6668 8.50016C14.6668 4.81826 11.6821 1.8335 8.00016 1.8335C4.31826 1.8335 1.3335 4.81826 1.3335 8.50016C1.3335 12.1821 4.31826 15.1668 8.00016 15.1668Z" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.3335 8.5H10.6668" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 5.8335V11.1668" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Create Agent
                    </button>
                  }
                />
              ) : (
                <Suspense fallback={
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <AgentCardSkeleton key={i} />
                    ))}
                  </div>
                }>
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {agents.map((agent) => (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        onEdit={() => handleEdit(agent.id)}
                        onDelete={() => handleDelete(agent)}
                        onDuplicate={() => handleDuplicate(agent.id)}
                        onViewLogs={() => handleViewLogs(agent.id)}
                        onTest={() => {}}
                      />
                    ))}
                  </div>
                </Suspense>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-lg p-8 animate-pulse w-96 h-48" /></div>}>
        {agentToDelete && (
          <DeleteAgentDialog
            isOpen={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false);
              setAgentToDelete(null);
            }}
            onConfirm={confirmDelete}
            agentName={agentToDelete.name}
          />
        )}
      </Suspense>
    </MainLayout>
  );
} 