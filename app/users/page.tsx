// app/user/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Lead = {
  id: number;
  name: string;
  email: string;
  status: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from API and Filter
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/leads", {
          cache: "no-store", // Force fresh data
        });

        if (!res.ok) {
          console.error("Failed to fetch data");
          return;
        }

        const data: Lead[] = await res.json();

        // 🚨 THE MAGIC: Filter out everyone who isn't "Qualified"
        const qualifiedUsers = data.filter(
          (lead) => lead.status === "Qualified"
        );

        setUsers(qualifiedUsers);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary-light)]">
            Active Users
          </h1>
          
        </div>

        <Link href="/leads">
          <button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-4 py-2 rounded-xl text-white shadow">
            ← Back to Leads
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--primary-dark)]/30 bg-gray-900/80 backdrop-blur shadow-lg">
        <table className="min-w-full text-sm text-gray-300 table-auto">
          {/* Header */}
          <thead className="bg-[var(--primary-dark)]/20 text-[var(--primary-light)] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Id</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  No qualified users found. Go qualify some leads!
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-800 hover:bg-[var(--primary)]/5 transition duration-200"
                >
                  {/* Real Database ID */}
                  <td className="px-6 py-4 text-gray-400 font-mono">
                    #{user.id}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 text-white font-medium">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-400">
                    {user.email}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      {user.status}
                    </span>
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