import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "@/components/layout/Navbar"; // Adjust path if needed
import Sidebar from "@/components/layout/Sidebar"; // Adjust path if needed
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lead Manager",
  description: "Manage your sales pipeline effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 
        h-screen and overflow-hidden ensure the entire app locks to the 
        browser window, preventing the whole page from bouncing/scrolling 
      */}
      <body className={`${inter.className} bg-[var(--bg-dark)] text-white h-screen overflow-hidden flex`}>
        
        {/* Sidebar locks to the left */}
        <Sidebar />

        {/* Main Area takes up the remaining space */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Navbar sits perfectly on top */}
          <Navbar />

          {/* This is the ONLY part of the app that scrolls */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#111827]">
            {children}
          </main>

        </div>

        {/* Global Toaster for premium notifications */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1f2937', // gray-800
              color: '#fff',
              border: '1px solid #374151', // gray-700
            },
            success: {
              iconTheme: {
                primary: '#4ade80', // green-400
                secondary: '#1f2937',
              },
            },
            error: {
              iconTheme: {
                primary: '#f87171', // red-400
                secondary: '#1f2937',
              },
            }
          }}
        />
      </body>
    </html>
  );
}