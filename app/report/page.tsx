"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { SlCloudDownload, SlCalender } from "react-icons/sl";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// 🎨 Theme Colors
const PRIMARY = "var(--primary)";
const PRIMARY_LIGHT = "var(--primary-light)";
const TEXT_MUTED = "#9ca3af";
const BG_DARK = "#1f2937";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30"); // "7", "30", "90", "all"

  // 🔹 Mock Historical Data (In a real app, this changes based on the dateRange)
  const acquisitionTrend = [
    { date: "Week 1", leads: 12, qualified: 4 },
    { date: "Week 2", leads: 19, qualified: 7 },
    { date: "Week 3", leads: 15, qualified: 5 },
    { date: "Week 4", leads: 25, qualified: 10 },
  ];

  const sourceData = [
    { source: "Organic Search", count: 45 },
    { source: "Referrals", count: 25 },
    { source: "Social Media", count: 30 },
    { source: "Cold Email", count: 20 },
  ];

  // 📊 Key Performance Indicators
  const kpis = {
    conversionRate: "24.5%",
    lostRate: "12.0%",
    avgTimeToClose: "14 Days",
    pipelineValue: "$45,000",
  };

  // 🛠️ The "Export to CSV" Magic
  const handleExportCSV = () => {
    const toastId = toast.loading("Generating CSV report...");
    
    // Simulate network delay for UX
    setTimeout(() => {
      // Create fake CSV content
      const headers = "Date,Total Leads,Qualified Leads\n";
      const rows = acquisitionTrend.map(row => `${row.date},${row.leads},${row.qualified}`).join("\n");
      const csvContent = "data:text/csv;charset=utf-8," + headers + rows;

      // Trigger browser download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `lead_report_last_${dateRange}_days.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Report downloaded!", { id: toastId });
    }, 1000);
  };

  // Custom Tooltip Style
  const customTooltipStyle = {
    backgroundColor: BG_DARK,
    border: "1px solid #374151",
    borderRadius: "0.5rem",
    color: "#fff",
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 🚀 Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-2 bg-[#1f2937]/30 rounded-2xl border border-gray-800 backdrop-blur-sm px-6 py-4">
        
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary-light)]">Performance Reports</h1>
          <p className="text-gray-400 text-sm mt-1">Analyze your lead generation and conversion metrics.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Date Filter */}
         {/* Date Filter */}
          <div className="relative w-full md:w-48">
            {/* Added pointer-events-none so clicking the icon opens the menu */}
            <SlCalender className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              /* Swapped p-2.5 for py-2.5 and pl-11 to prevent overlap */
              className="w-full py-2.5 pr-8 pl-11 rounded-xl bg-gray-900/80 border border-gray-700 text-white outline-none focus:border-[var(--primary)] transition cursor-pointer appearance-none shadow-inner text-sm font-medium"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">This Quarter</option>
              <option value="all">Year to Date</option>
            </select>
          </div>
          {/* Export Button */}
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-all px-4 py-2.5 rounded-xl text-white font-medium text-sm shadow-lg whitespace-nowrap active:scale-95"
          >
            <SlCloudDownload className="text-lg text-[var(--primary-light)]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 📈 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-xs">Conversion Rate</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 text-white">{kpis.conversionRate}</h2>
          <p className="text-green-400 text-xs mt-2 font-medium">↑ +2.4% vs last period</p>
        </Card>

        <Card>
          <p className="text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-xs">Avg Time to Close</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 text-white">{kpis.avgTimeToClose}</h2>
          <p className="text-green-400 text-xs mt-2 font-medium">↓ -1.5 days</p>
        </Card>

        <Card>
          <p className="text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-xs">Lost Rate</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 text-white">{kpis.lostRate}</h2>
          <p className="text-red-400 text-xs mt-2 font-medium">↑ +0.8% vs last period</p>
        </Card>

        <Card>
          <p className="text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-xs">Pipeline Value</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 text-[var(--primary-light)]">{kpis.pipelineValue}</h2>
          <p className="text-gray-500 text-xs mt-2 font-medium">Estimated potential</p>
        </Card>
      </div>

      {/* 📊 Deep Dive Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Line Chart: Trend over time */}
        <Card>
          <div className="mb-6">
            <h2 className="font-semibold text-gray-200">Acquisition vs. Qualification</h2>
            <p className="text-xs text-gray-500 mt-1">Comparing total leads generated to those marked as qualified.</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={acquisitionTrend} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="date" stroke={TEXT_MUTED} fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke={TEXT_MUTED} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Line type="monotone" name="Total Leads" dataKey="leads" stroke={PRIMARY_LIGHT} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" name="Qualified" dataKey="qualified" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart: Lead Sources */}
        <Card>
          <div className="mb-6">
            <h2 className="font-semibold text-gray-200">Top Lead Sources</h2>
            <p className="text-xs text-gray-500 mt-1">Where your highest volume of leads are coming from.</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke={TEXT_MUTED} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="source" type="category" stroke={TEXT_MUTED} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#374151', opacity: 0.4 }} contentStyle={customTooltipStyle} />
              <Bar name="Leads" dataKey="count" fill={PRIMARY} radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </div>
  );
}