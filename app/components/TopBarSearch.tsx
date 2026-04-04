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
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      "_blank"
    );
  };

  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex flex-1 items-center gap-2">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
          placeholder="Search worship songs..."
          className="w-full rounded border px-3 py-2 text-black"
        />
        <button
          onClick={handleLocalSearch}
          className="rounded bg-white px-3 py-2 text-sm font-medium text-blue-900"
        >
          Search Folder
        </button>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <input
          type="text"
          value={googleQuery}
          onChange={(e) => setGoogleQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGoogleSearch()}
          placeholder="Search Google for any song..."
          className="w-full rounded border px-3 py-2 text-black"
        />
        <button
          onClick={handleGoogleSearch}
          className="rounded bg-yellow-400 px-3 py-2 text-sm font-medium text-black"
        >
          Google
        </button>
      </div>
    </div>
  );
}