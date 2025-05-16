import { BoltIcon } from '@heroicons/react/24/outline';
import { ActionMenu } from './ActionMenu';
import type { Agent } from '@/app/hooks/useAgents';
import type { Action } from './ActionMenu';

interface AgentCardProps {
  agent: Agent;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onViewLogs?: () => void;
  onTest?: () => void;
}

const statusMap = {
  active: {
    label: 'Active',
    className: 'bg-green-100 text-green-700',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-gray-100 text-gray-700',
  },
  error: {
    label: 'Error',
    className: 'bg-red-100 text-red-700',
  },
};

function formatLastActive(dateString?: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return `Last active: ${date.toLocaleString()}`;
}

export function AgentCard({
  agent,
  onEdit,
  onDelete,
  onDuplicate,
  onViewLogs,
  onTest,
}: AgentCardProps) {
  const actions: Action[] = [
    onEdit ? { label: 'Edit', onClick: onEdit } : undefined,
    onDuplicate ? { label: 'Duplicate', onClick: onDuplicate } : undefined,
    onViewLogs ? { label: 'View Logs', onClick: onViewLogs } : undefined,
    onDelete ? { label: 'Delete', onClick: onDelete, destructive: true } : undefined,
  ].filter(Boolean) as Action[];

  const status = statusMap[agent.status] || statusMap['inactive'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between min-h-[320px] relative group transition hover:shadow-md">
      {/* Action menu */}
      {actions.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <ActionMenu actions={actions} />
        </div>
      )}
      {/* Icon and status */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <BoltIcon className="h-7 w-7 text-primary" />
        </div>
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${status.className}`}>
          {status.label}
        </span>
      </div>
      {/* Name and description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{agent.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{agent.description}</p>
      </div>
      {/* Channels */}
      {agent.channels && agent.channels.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 font-medium mb-1">Channels</div>
          <div className="flex flex-wrap gap-2">
            {agent.channels.map((channel) => (
              <span key={channel} className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                {channel}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Stats */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 font-medium mb-1">Stats</div>
        <div className="text-2xl font-bold text-gray-900 leading-none">{agent.conversationsCount ?? 0}</div>
        <div className="text-xs text-gray-500">Conversations</div>
        {agent.lastActive && (
          <div className="text-xs text-gray-400 mt-1">{formatLastActive(agent.lastActive)}</div>
        )}
      </div>
      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        {onEdit && (
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium text-sm transition"
            onClick={onEdit}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="h-4 w-4"><path d="M12.293 2.293a1 1 0 0 1 1.414 1.414l-.793.793-1.414-1.414.793-.793ZM10.879 3.707 3 11.586V14h2.414l7.879-7.879-1.414-1.414Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Edit
          </button>
        )}
        {onTest && (
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-medium text-sm transition"
            onClick={onTest}
          >
            Test Agent
          </button>
        )}
      </div>
    </div>
  );
} 