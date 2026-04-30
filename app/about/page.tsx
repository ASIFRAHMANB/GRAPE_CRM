import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] px-6 py-5 md:px-16 lg:px-32 ">
      
      <div className="max-w-2xl">

        {/* Label */}
        <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--primary-light)] mb-6">
          <span className="w-6 h-px bg-[var(--primary-light)]" />
          MINI CRM
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          Manage Your Leads <br />
          <span className="text-[var(--primary)]">Smarter & Faster</span>
        </h1>

        {/* Divider */}
        <div className="w-12 h-1 bg-[var(--primary)] rounded-full mb-6" />

        {/* Description */}
        <p className="text-gray-400 text-lg leading-relaxed">
          Track, manage, and grow your leads in one place. This Mini CRM helps you
          organize contacts, monitor activity, and stay focused on what matters most.
        </p>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="mt-10 inline-block px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-sm font-semibold tracking-widest uppercase rounded transition-colors duration-200"
        >
          Go to Dashboard →
        </Link>

      </div>
    </main>
  );
}