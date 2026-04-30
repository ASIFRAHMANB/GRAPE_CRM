"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlUser, SlEnvolope, SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import toast from "react-hot-toast";

type Lead = {
  name: string;
  email: string;
  status: string;
};

export default function EditLead() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const router = useRouter();

  const [form, setForm] = useState<Lead>({ name: "", email: "", status: "New" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load Lead Data
  useEffect(() => {
    async function loadLead() {
      if (!id) return;
      try {
        const res = await fetch(`/api/leads/${id}`, { cache: "no-store" });
        if (!res.ok) {
          setError("Lead not found");
          return;
        }
        const data = await res.json();
        setForm(data);
      } catch (err) {
        setError("Something went wrong loading the lead.");
      } finally {
        setLoading(false);
      }
    }
    loadLead();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation with Toasts
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and Email are required.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating lead...");

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Lead updated successfully!", { id: toastId });
      router.push("/leads");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update lead.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <svg className="animate-spin h-10 w-10 text-[var(--primary)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-400 font-medium">Loading lead data...</p>
      </div>
    );
  }

  // Error State UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-red-400 text-xl font-bold mb-4">{error}</p>
        <Link href="/leads" className="text-[var(--primary-light)] hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Main Edit UI
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-10">
      
      {/* Back Button */}
      <div className="w-full max-w-md mb-6">
        <Link 
          href="/leads" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--primary-light)] transition text-sm group font-medium"
        >
          <SlArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </Link>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#1f2937]/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-[var(--primary-light)] text-center tracking-wide">
          Edit Lead
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8 font-mono bg-gray-900/50 py-1 rounded-full w-fit mx-auto px-4 border border-gray-700">
          ID: #{id}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Full Name
            </label>
            <div className="relative">
              <SlUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 pl-12 rounded-xl bg-gray-900/80 border border-gray-700 focus:border-[var(--primary)] text-white outline-none transition shadow-inner"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <SlEnvolope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 pl-12 rounded-xl bg-gray-900/80 border border-gray-700 focus:border-[var(--primary)] text-white outline-none transition shadow-inner"
              />
            </div>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Lead Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-900/80 border border-gray-700 text-white outline-none focus:border-[var(--primary)] transition cursor-pointer appearance-none shadow-inner"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-70 disabled:cursor-not-allowed transition-all py-3.5 rounded-xl text-white font-bold shadow-lg mt-6 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Changes...
              </>
            ) : (
              "Update Lead"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}