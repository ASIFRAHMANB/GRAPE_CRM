"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SlMagnifier } from "react-icons/sl";
import { LuGrape } from "react-icons/lu";
import Link from "next/link";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // 🔐 Check login status from cookie
  useEffect(() => {
    const cookie = document.cookie.includes("isLoggedIn=true");
    setIsLoggedIn(cookie);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/leads?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    // ❌ remove cookie
    document.cookie =
      "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--primary-dark)] bg-[var(--primary-side)]">
      
      {/* Title */}
      <Link href="/" className="text-xl font-bold text-[var(--primary-light)]">
        <LuGrape />
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <form 
          onSubmit={handleSearch}
          className="flex items-center bg-[var(--primary-dark)] px-3 py-1 rounded gap-2"
        >
          <button type="submit">
            <SlMagnifier className="text-[var(--primary-light)] text-sm cursor-pointer" />
          </button>
          <input
            type="text"
            placeholder="Search leads..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-white"
          />
        </form>
        <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">
          A
        </div>

        {/* 🔐 Login / Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-[var(--primary-dark)] px-3 py-1 rounded text-white text-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-[var(--primary-dark)] px-3 py-1 rounded text-white text-sm"
          >
            Login
          </button>
        )}

        {/* Profile */}
        

      </div>
    </header>
  );
}