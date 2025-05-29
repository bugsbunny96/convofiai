import { Fragment, useEffect, useState, createContext } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
  children?: React.ReactNode;
}

const icons = {
  default: InformationCircleIcon,
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationCircleIcon,
};

const colors = {
  default: 'bg-gray-50 text-gray-800',
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  info: 'bg-blue-50 text-blue-800',
  warning: 'bg-yellow-50 text-yellow-800',
};

const ToastContext = createContext<{ addToast: (toast: ToastProps) => void }>({
  addToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: ToastProps) => {
    setToasts((prev) => [...prev, toast]);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast key={index} {...toast} />
      ))}
    </ToastContext.Provider>
  );
}

export function ToastViewport() {
  return <div className="fixed top-0 right-0 z-50 p-4" />;
}

export function Toast({
  title,
  description,
  type = 'default',
  duration = 5000,
  onClose,
  isVisible = true,
  children,
}: ToastProps) {
  const [show, setShow] = useState(isVisible);
  const Icon = icons[type];

  useEffect(() => {
    setShow(isVisible);
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-0 right-0 z-50 p-2 sm:p-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div
          className={`rounded-lg p-3 sm:p-4 shadow-lg ${colors[type]} flex items-start gap-2 sm:gap-3 relative`}
          style={{ minWidth: 220 }}
        >
          <div className="flex-shrink-0 pt-0.5 sm:pt-1">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0 pr-6 sm:pr-8">
            {title && <p className="text-xs sm:text-sm font-semibold leading-tight mb-0.5">{title}</p>}
            {(description || children) && (
              <p className="text-xs sm:text-sm mt-0.5 break-words leading-snug">{description || children}</p>
            )}
          </div>
          <button
            type="button"
            className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => {
              setShow(false);
              onClose?.();
            }}
            aria-label="Close"
          >
            <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Transition>
  );
} 