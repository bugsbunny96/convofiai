'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNavigation } from '@/app/context/NavigationContext';
import { usePathname } from 'next/navigation';
import { Popover } from '@headlessui/react';
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartPieIcon,
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import ConvofiAI from '@/public/ConvofiAI.svg';
import { UserAccount } from "@/app/types/user";

const navigation = [
  { name: 'Dashboard', href: '/', icon: ChartBarIcon },
  { name: 'Conversations', href: '/conversations', icon: ChatBubbleLeftRightIcon },
  { name: 'AI Agents', href: '/ai-agents', icon: CommandLineIcon },
  { name: 'Channel Settings', href: '/channel-settings', icon: PhoneIcon },
  { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpenIcon },
  { name: 'Leads', href: '/leads', icon: UserGroupIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartPieIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { setSelectedTab, isReady } = useNavigation();
  const pathname = usePathname();
  const [user, setUser] = useState<UserAccount | null>(null);

  const handleLogout = () => {
    // Clear any local storage or state
    localStorage.clear();
    sessionStorage.clear();
    // Remove cookies by setting them to expire in the past
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Redirect to login page
    window.location.href = "/login";
  };

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("convofyai_selected_account") || localStorage.getItem("convofyai_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      }
    }
  }, []);
  

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </button>

      {/* Sidebar for mobile */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b">
            <Link href="/" className="text-xl font-bold text-primary" onClick={() => setSelectedTab('Dashboard')}>
              <Image src={ConvofiAI} alt="ConvofiAI" width={100} height={100} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = isReady && pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setSelectedTab(item.name);
                    setIsOpen(false);
                  }}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-md hover:bg-gray-100 group text-sm sm:text-base ${isActive ? 'bg-primaryLight text-primary' : 'text-gray-600'}`}
                >
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 ${isActive ? 'text-primary' : ''}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="p-3 sm:p-4 border-t">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primaryLight flex items-center justify-center">
                          <span className="text-primary font-medium text-sm sm:text-base">U</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700 truncate max-w-[120px] sm:max-w-[160px]">
                            {user?.meta?.name || "User"}
                          </p>
                          {user?.meta?.name && (
                            <p className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-[160px]">
                              {user.meta.name}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-[160px]">
                            {
                              user?.coms?.find(c => c.type === "email")?.nmbr ||
                              user?.user?.find(c => c.type === "email")?.nmbr ||
                              ""
                            }
                          </p>
                        </div>
                      </div>
                      <ChevronUpIcon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''}`} />
                    </div>
                  </Popover.Button>

                  <Popover.Panel className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
} 