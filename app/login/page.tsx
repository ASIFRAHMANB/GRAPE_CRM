"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = () => {
  if (email === "admin@gmail.com" && password === "1234") {
    document.cookie = "isLoggedIn=true; path=/";
    window.location.href = "/dashboard"; // safer than router here
  } else {
    alert("Invalid credentials");
  }
};
  return (
    <div className="flex h-screen justify-center items-center pb-65">
      <div className="bg-gray-500/20  border border-[var(--primary-light)] p-6 rounded w-80 space-y-4">
        <h1 className="text-xl font-bold text-[var(--primary-light)]">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-grey-700 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[var(--primary-light)] p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}