import { PlusIcon } from '@heroicons/react/24/solid';

interface AddContentButtonProps {
  onClick: () => void;
  className?: string;
}

export default function AddContentButton({ onClick, className }: AddContentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium shadow hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${className || ''}`}
    >
      <PlusIcon className="h-5 w-5" />
      Add Content
    </button>
  );
} 