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

  // const handleGoogleSearch = () => {
  //   const q = googleQuery.trim();
  //   if (!q) return;
  //   window.open(
  //     `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  //     "_blank"
  //   );
  // };
const handleGoogleSearch = () => {
  const q = googleQuery.trim();
  if (!q) return;
  router.push(`/google-search?q=${encodeURIComponent(q)}`);
};  

return (
  <div className="flex items-center gap-2">
    {/* Local Search */}
    <input
      type="text"
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
      placeholder="Search songs..."
      className="w-40 rounded border bg-gray-100 px-2 py-1 text-sm text-black"
    />
    <button
      onClick={handleLocalSearch}
      className="rounded bg-white px-2 py-1 text-xs font-medium text-blue-900 border"
  
    >
      Go
    </button>

    {/* Google Search */}
    <input
      type="text"
      value={googleQuery}
      onChange={(e) => setGoogleQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleGoogleSearch()}
      placeholder="Google..."
      className="w-40 rounded border bg-gray-100 px-2 py-1 text-sm text-black"
    />
    <button
      onClick={handleGoogleSearch}
      className="rounded bg-white px-2 py-1 text-xs font-medium text-blue-900 border"
    >
      🔍
    </button>
  </div>
);
}