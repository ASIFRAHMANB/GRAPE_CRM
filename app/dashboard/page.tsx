"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

// 🎨 Theme Colors (Grape Theme)
const COLORS = [
  "#f43f5e", // Rose/Lost
  "#6366f1", // Primary (Indigo)
  "#FFBF00", // Purple
  "#10b981", // Success (Emerald)
];

type Lead = {
  id: number;
  name: string;
  email: string;
  status: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data on mount
  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (error) {
        console.error("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // 📊 Dynamic Calculations based on real data
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const activeLeads = leads.filter(
    (l) => l.status === "Contacted" || l.status === "Qualified"
  ).length;

  // Process data for the Pie/Donut charts
  const statusCounts = leads.reduce((acc: any, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const dynamicLeadStatusData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  // 🔹 Static Mock Data (Styled for Grape Theme)
  const monthlyLeads = [
    { month: "Jan", leads: 30 },
    { month: "Feb", leads: 45 },
    { month: "Mar", leads: 60 },
    { month: "Apr", leads: 40 },
  ];

  const histogramData = [
    { range: "0-10", count: 5 },
    { range: "10-20", count: 12 },
    { range: "20-30", count: 8 },
    { range: "30-40", count: 3 },
  ];

  const waveData = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 15 },
    { x: 4, y: 25 },
  ];

  // Custom Tooltip Style for Dark Mode
  const customTooltipStyle = {
    backgroundColor: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "0.5rem",
    color: "#fff",
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <svg className="animate-spin h-10 w-10 text-[var(--primary)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-400 font-medium">Loading metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl font-bold text-[var(--primary-light)]">
          Dashboard Overview
        </h1>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-gray-400 font-medium uppercase tracking-wider text-xs">Total Leads</p>
          <h2 className="text-3xl font-bold mt-2 text-white">{totalLeads}</h2>
        </Card>

        <Card>
          <p className="text-gray-400 font-medium uppercase tracking-wider text-xs">Active Leads</p>
          <h2 className="text-3xl font-bold mt-2 text-white">{activeLeads}</h2>
        </Card>

        <Card>
          <p className="text-gray-400 font-medium uppercase tracking-wider text-xs">New Leads</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-light)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--primary)]"></span>
            </span>
            <h2 className="text-3xl font-bold text-white">{newLeads}</h2>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Real Data Pie Chart */}
        <Card>
          <h2 className="mb-6 font-semibold text-gray-200">Current Lead Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={dynamicLeadStatusData} 
                dataKey="value" 
                outerRadius={90}
                stroke="#1f2937" // Matches dark background
                strokeWidth={2}
              >
                {dynamicLeadStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Real Data Donut Chart */}
        <Card>
          <h2 className="mb-6 font-semibold text-gray-200">Distribution Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dynamicLeadStatusData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                stroke="#1f2937"
                strokeWidth={2}
                paddingAngle={5}
              >
                {dynamicLeadStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Static Monthly Bar Chart */}
        <Card>
          <h2 className="mb-6 font-semibold text-gray-200">Monthly Acquisition</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyLeads}>
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#374151', opacity: 0.4 }} contentStyle={customTooltipStyle} />
              <Bar dataKey="leads" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Static Trend Line Chart */}
        <Card>
          <h2 className="mb-6 font-semibold text-gray-200">Conversion Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={waveData}>
              <XAxis dataKey="x" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="var(--primary-light)" 
                strokeWidth={3} 
                dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </div>
  );
}