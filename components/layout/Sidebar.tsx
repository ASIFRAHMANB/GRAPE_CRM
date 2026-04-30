"use client";
import { SlChart } from "react-icons/sl";
import { SlPeople } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";
import { SlSettings } from "react-icons/sl";
import { SlInfo } from "react-icons/sl";
import { SlGraph } from "react-icons/sl";



import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-48 bg-[var(--primary-side)] border-r border-[var(--primary-dark)] p-4">
      
<div className="flex items-center gap-2 mb-4">
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--primary)]"></span>
  </span>

  <h1 className="text-sm font-bold text-[var(--primary-light)]">GRAPE-CRM</h1>
</div>
      {/* Navigation */}
      <nav className="space-y-1">
        
        {/* Dashboard */}
        <Link
  href="/dashboard"
  className="flex items-center gap-2 p-2 rounded hover:bg-[var(--primary-dark)]"
>
  <SlChart />
  <span>Dashboard</span>
</Link>
        {/* Leads Dropdown */}
<div>
  <button
    onClick={() => setOpen(!open)}
    className="w-full text-left p-2 rounded hover:bg-[var(--primary-dark)] flex justify-between items-center"
  >
    <div className="flex items-center gap-2">
      <SlUserFollowing className="mt-[1px]" />
      <span>Leads</span>
    </div>

    <span>{open ? "▴" : "▾"}</span>
  </button>

  {open && (
    <div className="ml-4 mt-2 space-y-1">
      <Link
        href="/leads"
        className="block p-2 rounded hover:bg-[var(--primary-dark)]"
      >
        All Leads
      </Link>

      <Link
        href="/leads/add"
        className="block p-2 rounded bg-[var(--primary)]"
      >
        Add Lead
      </Link>
    </div>
  )}
</div>

        {/* Other Links */}
        <Link
          href="/users"
          className="flex items-center gap-2 p-2 rounded hover:bg-[var(--primary-dark)]"
        >
            <SlPeople className="mt-[1px]"/>
         <span> Users</span>
        </Link>

<Link
  href="/about"
  className="flex items-center gap-2 p-2 rounded hover:bg-[var(--primary-dark)]"
>
  <SlInfo />
  <span>About</span>
</Link>
        <Link
  href="/settings"
  className="flex items-center gap-2 p-2 rounded hover:bg-[var(--primary-dark)]"
>
  <SlSettings />
  <span>Settings</span>
</Link>
         <Link
  href="/report"
  className="flex items-center gap-2 p-2 rounded hover:bg-[var(--primary-dark)]"
>
  <SlGraph />
  <span>Report</span>
</Link>
      </nav>
    </aside>
  );
}