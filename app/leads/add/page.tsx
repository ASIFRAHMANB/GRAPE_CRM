 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlUser, SlEnvolope, SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AddLead() {
  const router = useRouter();

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New",
  });

  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Validation Logic
  const validate = () => {
    let newErrors = { name: "", email: "" };
    let isValid = true;

    // Validate Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (/\d/.test(form.name)) {
      newErrors.name = "Name should not contain numbers";
      isValid = false;
    }

    // Validate Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    
    if (!isValid) {
      toast.error("Please fix the errors in the form.");
    }
    
    return isValid;
  };

  // ✅ Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Saving lead...");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Lead added successfully!", { id: toastId });
        router.push("/leads");
        router.refresh(); // Forces Next.js to pull the latest data from db.json
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save lead", { id: toastId });
      }
    } catch (err) {
      console.error("Error adding lead:", err);
      toast.error("A network error occurred.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="text-2xl font-bold mb-8 text-[var(--primary-light)] text-center tracking-wide">
          Add New Lead
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Full Name
            </label>
            <div className="relative">
              <SlUser className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? 'text-red-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="username"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full p-3 pl-12 rounded-xl bg-gray-900/80 border ${
                  errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-[var(--primary)]'
                } text-white outline-none transition shadow-inner`}
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-2 ml-1 font-medium">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <SlEnvolope className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="name@test.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full p-3 pl-12 rounded-xl bg-gray-900/80 border ${
                  errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-[var(--primary)]'
                } text-white outline-none transition shadow-inner`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-2 ml-1 font-medium">{errors.email}</p>}
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Initial Status
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
                Saving Lead...
              </>
            ) : (
              "Save Lead"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}