"use client";

import { useState, useEffect } from "react";
import { UserAccountCreate, UserAccountList } from "../services/users-realms";
import { UserAccount } from "../types/user";
import SideImg from "../../public/sidegraphics.svg";
import Image from "next/image";
import ConvofiAI from "@/public/ConvofiAI.svg";
import { normalizeUserAccount } from "@/app/lib/normalizeUser";

// Helper to store user data in localStorage
function storeUserToLocal(user: UserAccount) {
  localStorage.setItem("convofyai_user", JSON.stringify(user));
}

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Reset form and errors when switching tabs
  const handleTabSwitch = (newTab: "login" | "signup") => {
    setTab(newTab);
    setName("");
    setEmail("");
    setMobile("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (tab === "login") {
        // Allow login with dummy credentials
        if (
          email === "convofi@ai.com" &&
          mobile === "+919876543210"
        ) {
          const dummyUser: UserAccount = {
            item: "dummy-user",
            meta: { name: "ConvofiAI" },
            coms: [
              { nmbr: email, type: "email" },
              { nmbr: mobile, type: "mobile" }
            ],
            user: [
              { nmbr: email, type: "email" },
              { nmbr: mobile, type: "mobile" }
            ],
            feat: { self: true, hold: false },
            onbd: { obnm: true, obcr: true, oblc: true, obcm: true, obtr: true },
            actv: true,
            role: "user"
          };
          
          setSuccess("Login successful!");
          storeUserToLocal(dummyUser);
          document.cookie = "auth-token=dummy; path=/; max-age=86400; SameSite=Lax";
          setTimeout(() => {
            window.location.href = "/select-account";
          }, 1200);
          setLoading(false);
          return;
        }

        // Real login
        const res = await UserAccountList({
          body: {
            data: { user: email },
            srvc: "988b9aee-f02a-411c-957d-02ef420586a2"
          }
        });

        if (res?.stat && res.data?.list?.length > 0) {
          setSuccess("Login successful!");
          // Normalize all accounts before storing
          const normalizedAccounts = res.data.list.map(normalizeUserAccount);
          localStorage.setItem("convofyai_accounts", JSON.stringify(normalizedAccounts));
          storeUserToLocal(normalizedAccounts[0]);
          document.cookie = "auth-token=dummy; path=/; max-age=86400; SameSite=Lax";
          setTimeout(() => {
            window.location.href = "/select-account";
          }, 1200);
        } else {
          setError("User not found. Redirecting to Signup...");
          setTimeout(() => handleTabSwitch("signup"), 1500);
        }
      } else {
        // Signup logic
        const res = await UserAccountCreate({
          body: {
            data: {
              name,
              mail: email,
              mobile,
            },
            srvc: "988b9aee-f02a-411c-957d-02ef420586a2",
          },
        });

        if (res?.stat) {
          // Fetch full user object after signup
          const listRes = await UserAccountList({
            body: {
              data: { user: email },
              srvc: "988b9aee-f02a-411c-957d-02ef420586a2",
            },
          });
          if (listRes?.stat && listRes.data?.list?.length > 0) {
            const normalizedAccounts = listRes.data.list.map(normalizeUserAccount);
            localStorage.setItem("convofyai_accounts", JSON.stringify(normalizedAccounts));
            storeUserToLocal(normalizedAccounts[0]);
          } else {
            // fallback: store what we have, normalized
            const normalized = normalizeUserAccount(res.data);
            localStorage.setItem("convofyai_accounts", JSON.stringify([normalized]));
            storeUserToLocal(normalized);
          }
          setSuccess("Account created successfully! Redirecting to Account Selection...");
          document.cookie = "auth-token=dummy; path=/; max-age=86400; SameSite=Lax";
          setTimeout(() => {
            window.location.href = "/select-account";
          }, 1200);
        } else if (res?.memo === "user account exist") {
          setError("User already exists. Redirecting to Login...");
          setTimeout(() => handleTabSwitch("login"), 1500);
        } else {
          setError(res?.memo || "Account creation failed");
        }
      }
    } catch (err: unknown) {
      let errorMsg = "An error occurred";
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        errorMsg = (err as { message: string }).message;
      }
      setError(errorMsg);
      if (tab === "signup") {
        console.error("Signup error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        window.location.href = "/select-account";
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 relative overflow-hidden w-full">
      {/* Background Graphics */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-8 right-8 w-64 h-64 opacity-30">
          <Image src={SideImg} alt="" fill style={{objectFit:'contain'}} sizes="256px" priority />
        </div>
        <div className="absolute bottom-8 left-8 w-40 h-40 opacity-20">
          <Image src={SideImg} alt="" fill style={{objectFit:'contain'}} sizes="256px" priority />
        </div>
      </div>
      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 relative flex flex-col items-center">
          {/* Logo */}
          <div className="flex justify-center mb-6 w-full">
            <div className="h-12 w-36 relative">
              <Image src={ConvofiAI} alt="ConvofyAI Logo" fill style={{objectFit:'contain'}} priority />
            </div>
          </div>
          {/* Tab Switcher */}
          <div className="flex justify-center mb-6 w-full">
            <button
              type="button"
              className={`px-6 py-2 rounded-l-lg font-semibold text-base transition ${tab === "login" ? "bg-primary text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleTabSwitch("login")}
              disabled={tab === "login"}
            >
              Login
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded-r-lg font-semibold text-base transition ${tab === "signup" ? "bg-primary text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleTabSwitch("signup")}
              disabled={tab === "signup"}
            >
              Signup
            </button>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 w-full">
            {tab === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-center text-gray-500 mb-6 text-base w-full">
            {tab === "login"
              ? "Login to your ConvofyAI account"
              : "Sign up to get started with ConvofyAI"}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            {tab === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 text-base px-3 py-2 bg-gray-50 transition placeholder-gray-400"
                  disabled={loading}
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 text-base px-3 py-2 bg-gray-50 transition placeholder-gray-400"
                disabled={loading}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                type="tel"
                inputMode="tel"
                required
                pattern="^\+[1-9]\d{1,14}$"
                placeholder="+1234567890"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 text-base px-3 py-2 bg-gray-50 transition placeholder-gray-400"
                disabled={loading}
                autoComplete="tel"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter your mobile in international format, e.g. <span className="font-mono">+91987654</span>
              </p>
            </div>
            {error && <div className="text-red-500 text-sm text-center mt-1">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center mt-1">{success}</div>}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-base mt-2 shadow-sm hover:bg-primary/90 transition disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              disabled={loading}
            >
              {loading
                ? tab === "login"
                  ? "Logging in..."
                  : "Creating..."
                : tab === "login"
                ? "Login"
                : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 