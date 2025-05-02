'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface NavigationContextType {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  isReady: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const pathToTabName: { [key: string]: string } = {
  '/': 'Dashboard',
  '/conversations': 'Conversations',
  '/ai-agents': 'AI Agents',
  '/channel-settings': 'Channel Settings',
  '/knowledge-base': 'Knowledge Base',
  '/leads': 'Leads',
  '/analytics': 'Analytics',
  '/settings': 'Settings'
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    // Set initial tab based on pathname
    const tabName = pathToTabName[pathname] || 'Dashboard';
    setSelectedTab(tabName);
  }, [pathname]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    // Find the path for the given tab name
    const path = Object.entries(pathToTabName).find(([, value]) => value === tab)?.[0] || '/';
    router.push(path);
  };

  return (
    <NavigationContext.Provider value={{ selectedTab, setSelectedTab: handleTabChange, isReady }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
} 