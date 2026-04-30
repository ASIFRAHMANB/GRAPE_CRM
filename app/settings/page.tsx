import { LiaBullseyeSolid } from "react-icons/lia";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      
      <h1 className="text-4xl md:text-5xl font-black text-[var(--primary)] tracking-tighter uppercase italic">
        There is no Settings in Ba-Sing-Se
      </h1>
      
      {/* Added aspect-square and rounded-full to ensure the container is a perfect circle */}
      <div className="mt-20 relative flex items-center justify-center aspect-square rounded-full">
        <div className="absolute inset-0  blur-3xl opacity-20 animate-pulse rounded-full"></div>
        
        {/* Added shrink-0 to prevent flexbox from squishing the SVG */}
        <LiaBullseyeSolid 
          size="16rem" 
          className="text-[var(--primary-light)] relative z-10 animate-spin shrink-0 rounded-full" 
          style={{ animationDuration: "10s" }}
        />
      </div>

      <p className="mt-12 text-gray-500 font-medium tracking-widest uppercase text-sm">
        Everything is functional. Everything is safe.
      </p>

    </div>
  );
}