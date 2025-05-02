'use client';

import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const title = pathname === '/' ? 'Dashboard' : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Selected Tab Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          {title}
        </h1>

        {/* Right side content */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search..."
            />
          </div>

          {/* Mobile search icon */}
          <button className="md:hidden p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {/* Notifications */}
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" />
          </button>

          {/* User menu */}
          <div className="flex items-center">
            <button className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-primaryLight flex items-center justify-center">
                <span className="text-primary font-medium">U</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
