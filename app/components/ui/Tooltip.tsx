import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Tooltip({
  content,
  children,
  position = 'top',
}: TooltipProps) {
  return (
    <Popover className="relative inline-block">
      {() => (
        <>
          <Popover.Button as="div" className="cursor-help">
            {children}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg ${
                positionClasses[position]
              }`}
            >
              {content}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
} 