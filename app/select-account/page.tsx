"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAccountList } from "../services/users-realms";
import { UserAccount } from "../types/user";
import Image from "next/image";
import ConvofiAI from "@/public/ConvofiAI.svg";
import { normalizeUserAccount } from "@/app/lib/normalizeUser";

const ACCOUNT_TYPES = {
  admin: {
    id: "admin",
    title: "Admin",
    description: "Full access to all features and user management",
    icon: "👑",
    roles: ["admin"]
  },
  business: {
    id: "business",
    title: "Business",
    description: "Access to business features and team management",
    icon: "💼",
    roles: ["owner", "manager", "member"]
  },
  personal: {
    id: "personal",
    title: "Personal",
    description: "Core Features – Tailored for You, Not the Crew",
    icon: "👤",
    roles: ["user"]
  }
};

export default function SelectAccountPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAccounts = async () => {
      console.log('Fetching accounts from API...');
      try {
        setFetching(true);
        setError("");

        // Try to load accounts from localStorage first
        const accountsStr = typeof window !== 'undefined' ? localStorage.getItem("convofyai_accounts") : null;
        if (accountsStr) {
          try {
            const accounts = JSON.parse(accountsStr);
            if (Array.isArray(accounts) && accounts.length > 0) {
              setAccounts(accounts.map(normalizeUserAccount));
              return;
            }
          } catch (error) {
            console.error("Error parsing cached accounts:", error);
          }
        }

        // Fetch fresh accounts from API route
        const response = await fetch('/api/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            body: {
              data: { user: "convo@ai.com" },
              srvc: "988b9aee-f02a-411c-957d-02ef420586a2"
            }
          }),
        });
        const result = await response.json();

        if (result?.stat && Array.isArray(result.data?.list)) {
          const normalizedAccounts = result.data.list.map(normalizeUserAccount);
          setAccounts(normalizedAccounts);
          // Cache the accounts for future use
          localStorage.setItem("convofyai_accounts", JSON.stringify(normalizedAccounts));
        } else {
          setAccounts([]);
          setError("No accounts found");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError("Failed to fetch accounts. Please try again later.");
        setAccounts([]);
      } finally {
        setFetching(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountSelect = (account: UserAccount) => {
    setSelectedAccount(account);
    setLoading(true);

    // Store the selected account
    localStorage.setItem("convofyai_selected_account", JSON.stringify(account));
    
    // Set session cookie
    document.cookie = `user_session=${account.item}; path=/; max-age=86400; SameSite=Lax`;
    
    // Redirect to dashboard
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleCreateBusinessAccount = () => {
    setCreatingAccount(true);
    // Redirect to business account creation page
    router.push("/create-business-account");
  };

  const getAccountType = (account: UserAccount) => {
    if (account.role === "team") {
      return ACCOUNT_TYPES.business;
    }
    if (account.feat.role === "admin") {
      return ACCOUNT_TYPES.admin;
    }
    return ACCOUNT_TYPES.personal;
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-4 overflow-y-scroll w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6 w-full">
          <div className="h-12 w-36 relative">
            <Image src={ConvofiAI} alt="ConvofyAI Logo" fill style={{objectFit:'contain'}} priority />
          </div>
        </div>
        <div className="text-center text-primary">Loading accounts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-4 overflow-y-scroll w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6 w-full">
          <div className="h-12 w-36 relative">
            <Image src={ConvofiAI} alt="ConvofyAI Logo" fill style={{objectFit:'contain'}} priority />
          </div>
        </div>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-4 overflow-y-scroll w-full">
      {/* Logo */}
      <div className="flex justify-center mb-6 w-full">
        <div className="h-12 w-36 relative">
          <Image src={ConvofiAI} alt="ConvofyAI Logo" fill style={{objectFit:'contain'}} priority />
        </div>
      </div>
      <div className="w-full max-w-5xl">
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Account</h1>
          <p className="text-gray-600">Choose which account you want to use</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {accounts.length === 0 ? (
            <div className="text-center text-gray-400 w-full">No accounts available.</div>
          ) : (
            accounts.map((account) => {
              const accountType = getAccountType(account);
              return (
                <button
                  key={account.item}
                  onClick={() => handleAccountSelect(account)}
                  disabled={loading}
                  className={`p-6 rounded-xl border-2 transition-all shadow-md ${
                    selectedAccount?.item === account.item
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-4xl mb-4">{accountType.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{account.meta.name}</h3>
                  <p className="text-gray-600 text-sm">{accountType.description}</p>
                  {/* {account.role === "team" && account.feat.role && (
                    <p className="text-primary text-sm mt-2">Role: {account.feat.role}</p>
                  )} */}
                </button>
              );
            })
          )}
        </div>
        {loading && (
          <div className="text-center mt-6">
            <p className="text-primary">Redirecting to dashboard...</p>
          </div>
        )}
        <div className="text-center mt-8">
          <button
            onClick={handleCreateBusinessAccount}
            disabled={loading || creatingAccount}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creatingAccount ? "Creating..." : "Create Business Account"}
          </button>
        </div>
      </div>
    </div>
  );
} 