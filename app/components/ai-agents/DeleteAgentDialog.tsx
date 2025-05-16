import { Dialog } from '../ui/Dialog';

interface DeleteAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  agentName: string;
}

export function DeleteAgentDialog({
  isOpen,
  onClose,
  onConfirm,
  agentName,
}: DeleteAgentDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Agent"
      size="sm"
    >
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Are you sure you want to delete {agentName}? This action cannot be
          undone.
        </p>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Delete
        </button>
      </div>
    </Dialog>
  );
} 