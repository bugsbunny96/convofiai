import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationProvider } from "./context/NavigationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvofyAI - Unified Communication Platform",
  description: "AI-Powered Unified Communication SaaS Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationProvider>
          <div className="flex h-screen bg-gray-50">
        {children}
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}
