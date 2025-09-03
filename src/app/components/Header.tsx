"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  Home, 
  User, 
  Upload, 
  LogOut, 
  LogIn, 
  Play, 
  Sparkles,
  ChevronDown,
  Settings,
  Video
} from "lucide-react";
import { useNotification } from "./Notification";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
      setIsDropdownOpen(false);
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  const getUserDisplayName = () => {
    if (!session?.user) return "";
    return session.user.name || session.user.email?.split("@")[0] || "User";
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center">
  <Link
    href="/"
    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
    prefetch={true}
    onClick={() => showNotification("Welcome to ImageKit ReelsPro", "info")}
  >
    <div className="relative">
      <div className="p-2 bg-gradient-to-r from-rose-600 to-amber-500 rounded-lg shadow-lg  group-hover:shadow-rose-600/40 transition-shadow duration-300">
        <Play className="w-5 h-5 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-lime-400 to-lime-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-2 h-2 text-white p-0.5" />
      </div>
    </div>
    <div>
      <h1 className="font-bold text-lg bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
        Stream Video
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
        Video Platform
      </p>
    </div>
  </Link>
</div>
          {/* Navigation & User Menu */}
          <div className="flex items-center gap-4">
            
            {/* Quick Actions (for authenticated users) */}
          {session && (
  <div className="hidden sm:flex items-center gap-2">
    <Link
      href="/upload"
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
      onClick={() => showNotification("Opening upload page", "info")}
    >
      <Upload className="w-4 h-4" />
      <span className="font-medium">Upload</span>
    </Link>
  </div>
)}

            {/* User Menu */}
            <div className="relative">
  <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${
      isDropdownOpen ? 'bg-slate-100 dark:bg-slate-800' : ''
    }`}
  >
    {session ? (
      <>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
            {getUserInitials()}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {getUserDisplayName()}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {session.user?.email}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
          isDropdownOpen ? 'rotate-180' : ''
        }`} />
      </>
    ) : (
      <>
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </div>
        <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-300">
          Account
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
          isDropdownOpen ? 'rotate-180' : ''
        }`} />
      </>
    )}
  </button>

  {/* Dropdown Menu */}
  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
      
      {session ? (
        <>
          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                {getUserInitials()}
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {getUserDisplayName()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/upload"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              onClick={() => {
                showNotification("Opening upload page", "info");
                setIsDropdownOpen(false);
              }}
            >
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                <Video className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Upload Video
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Share your content
                </p>
              </div>
            </Link>

            <button
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg">
                <Settings className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Settings
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Account preferences
                </p>
              </div>
            </button>
          </div>

          {/* Sign Out */}
          <div className="p-2 border-t border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-red-600 dark:text-red-400"
            >
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Sign Out</p>
                <p className="text-sm opacity-75">End your session</p>
              </div>
            </button>
          </div>
        </>
      ) : (
        /* Login Option */
        <div className="p-2">
          <Link
            href="/login"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            onClick={() => {
              showNotification("Please sign in to continue", "info");
              setIsDropdownOpen(false);
            }}
          >
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <LogIn className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Sign In
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Access your account
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  )}
</div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
}