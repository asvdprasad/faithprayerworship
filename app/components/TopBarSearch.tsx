"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TopBarSearch() {
  const router = useRouter();

  const [localQuery, setLocalQuery] = useState("");
  const [googleQuery, setGoogleQuery] = useState("");

  const handleLocalSearch = () => {
    const q = localQuery.trim();
    if (!q) return;
    router.push(`/worship/search?q=${encodeURIComponent(q)}`);
  };

  const handleGoogleSearch = () => {
    const q = googleQuery.trim();
    if (!q) return;
    router.push(`/google-search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
      {/* Local Search */}
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
        placeholder="Search songs..."
        className="w-full rounded border border-white/40 bg-white/90 px-3 py-2 text-sm text-black md:w-40"
      />

      <button
        onClick={handleLocalSearch}
        className="rounded border border-white/40 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50 md:px-2 md:py-1 md:text-xs"
      >
        Go
      </button>

      {/* Google Search */}
      <input
        type="text"
        value={googleQuery}
        onChange={(e) => setGoogleQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleGoogleSearch()}
        placeholder="Search Google..."
        className="w-full rounded border border-white/40 bg-white/90 px-3 py-2 text-sm text-black md:w-40"
      />

      <button
        onClick={handleGoogleSearch}
        className="rounded border border-white/40 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50 md:px-2 md:py-1 md:text-xs"
      >
        🔍
      </button>
    </div>
  );
}