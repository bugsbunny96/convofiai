import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationProvider } from "./context/NavigationContext";
import { ToastContextProvider } from '@/contexts/useToast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvofyAI - Unified Communication Platform",
  description: "AI-Powered Unified Communication SaaS Platform",
  icons: [
    {
      rel: 'icon',
      url: '/logo.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      url: '/logo.svg',
      type: 'image/svg+xml',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContextProvider>
          <NavigationProvider>
            <div className="flex h-screen bg-gray-50">
              {children}
            </div>
          </NavigationProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
