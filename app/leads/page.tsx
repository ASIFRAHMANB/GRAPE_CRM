"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SlMagnifier } from "react-icons/sl";
import { SlEqualizer } from "react-icons/sl";

// Types
type Lead = {
  id: string | number;
  name: string;
  email: string;
  status: string;
};

// Dynamic Color Dictionary
const statusColors: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-400",
  Contacted: "bg-amber-500/20 text-amber-400", 
  Qualified: "bg-green-500/20 text-green-400",
  Lost: "bg-red-500/20 text-red-400",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Add this new state!

  // Fetch leads on load
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        if (!res.ok) throw new Error("Failed to fetch leads");
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Delete Handler stub (Updates UI instantly)
  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    // Optimistic UI update
    setLeads(leads.filter(lead => lead.id !== id));
    
    // TODO: Add your DELETE API call here later
    // await fetch(`/api/leads/${id}`, { method: 'DELETE' });
  };

  // Combined Search & Filter Logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Check Search Query
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.id.toString().includes(searchQuery);

      // 2. Check Dropdown Filter
      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--primary-light)]">Lead Manager</h1>
        <Link href="/leads/add">
          <button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-4 py-2 rounded-xl text-white shadow-lg transition">
            + Add New Lead
          </button>
        </Link>
      </div>

{/* Search & Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <SlMagnifier className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-11 bg-gray-900/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[var(--primary)] transition shadow-sm"
          />
        </div>

{/* Custom Dropdown Filter */}
        <div className="relative w-full sm:w-72">
          
          {/* Trigger Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between p-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:outline-none focus:border-[var(--primary)] transition shadow-sm"
          >
            {/* Left side: Icon + Label */}
            <div className="flex items-center gap-2 text-gray-400">
              <SlEqualizer className="text-lg" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            
            {/* Right side: Selected Option + Arrow */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--primary-light)] font-medium">
                {statusFilter === "All" ? "All" : statusFilter}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* The Custom Dropdown Menu */}
          {isFilterOpen && (
            <>
              {/* Invisible full-screen overlay: closes the menu if you click outside of it */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsFilterOpen(false)} 
              />
              
              {/* The actual menu */}
              <div className="absolute top-full left-0 mt-2 w-full bg-[#111827] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                {["All", "New", "Contacted", "Qualified", "Lost"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setStatusFilter(option);
                      setIsFilterOpen(false); // Close menu on selection
                    }}
                    className={`w-full text-left px-5 py-3 hover:bg-gray-800 transition ${
                      statusFilter === option 
                        ? 'text-[var(--primary-light)] bg-gray-800/50 border-l-2 border-[var(--primary-light)]' 
                        : 'text-gray-300 border-l-2 border-transparent'
                    }`}
                  >
                    {option === "All" ? "All" : option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/80 shadow-lg">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-[var(--primary-dark)]/20 text-[var(--primary-light)] uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Id</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading leads...</td></tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  {searchQuery || statusFilter !== "All" ? "No leads match your criteria." : "No leads found. Add one!"}
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition">
                  {/* Truncate UUID if it's a string, otherwise show number */}
                  <td className="px-6 py-4 font-mono text-gray-500">
                    {typeof lead.id === 'string' ? `${lead.id.substring(0, 8)}...` : `#${lead.id}`}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                  <td className="px-6 py-4 text-gray-400">{lead.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[lead.status] || "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/leads/${lead.id}`}>
                      <button className="text-[var(--primary-light)] hover:text-white transition">Edit</button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}