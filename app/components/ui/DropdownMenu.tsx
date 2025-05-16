import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Accessible dropdown menu with keyboard navigation and click-away support.
 */
export interface DropdownMenuProps<T extends string> {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  label?: string;
  className?: string;
}

export function DropdownMenu<T extends string>({ options, value, onChange, label, className }: DropdownMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Focus first item when opening
  useEffect(() => {
    if (open) setFocusedIdx(0);
    else setFocusedIdx(-1);
  }, [open]);

  // Keyboard navigation
  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement | HTMLDivElement>) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      setFocusedIdx(i => (i + 1) % options.length);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setFocusedIdx(i => (i - 1 + options.length) % options.length);
      e.preventDefault();
    } else if (e.key === 'Enter' && focusedIdx >= 0) {
      onChange(options[focusedIdx]);
      setOpen(false);
      btnRef.current?.focus();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setOpen(false);
      btnRef.current?.focus();
      e.preventDefault();
    }
  }

  // Focus management for menu items
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;
    const items = menu.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
    if (focusedIdx >= 0 && items[focusedIdx]) {
      items[focusedIdx].focus();
    }
  }, [focusedIdx, open]);

  return (
    <div className={`relative inline-block text-left ${className || ''}`.trim()}>
      <button
        ref={btnRef}
        type="button"
        className="inline-flex items-center border text-gray-900 border-gray-300 rounded-md px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? 'dropdown-menu-list' : undefined}
        onClick={() => setOpen(v => !v)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {label && <span className="mr-2">{label}</span>}
        {value}
        <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="dropdown-menu-list"
            ref={menuRef}
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            tabIndex={-1}
            className="absolute z-20 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            onKeyDown={handleKeyDown}
          >
            <div className="p-2 space-y-1">
              {options.map((opt, idx) => (
                <button
                  key={opt}
                  role="menuitem"
                  aria-selected={value === opt}
                  aria-current={focusedIdx === idx}
                  className={`rounded-md w-full text-left px-4 py-2 text-sm ${value === opt ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700 hover:bg-gray-100'} ${focusedIdx === idx ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  tabIndex={-1}
                  onMouseEnter={() => setFocusedIdx(idx)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropdownMenu; 