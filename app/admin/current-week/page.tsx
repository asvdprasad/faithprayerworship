"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthGuard from "@/app/components/AuthGuard";
import {
  getCurrentWeek,
  clearCurrentWeek,
  getSongTitleMap,
} from "@/app/actions/songActions";

export default function AdminCurrentWeekPage() {
  const username = "admin";

  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [songTitleMap, setSongTitleMap] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadData() {
      const [songs, titleMap] = await Promise.all([
        getCurrentWeek(username),
        getSongTitleMap(),
      ]);

      setSelectedSongs(songs);
      setSongTitleMap(titleMap);
    }

    loadData();
  }, []);

  const handleClear = async () => {
    await clearCurrentWeek(username);
    setSelectedSongs([]);
  };

  return (
    <AuthGuard requiredRole="admin">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Manage Current Week</h1>

        <ul className="mb-6 space-y-2">
          {selectedSongs.length === 0 ? (
            <li className="text-gray-500">No songs selected for this week.</li>
          ) : (
            selectedSongs.map((slug, index) => (
              <li key={index}>
                <Link
                  href={`/worship/${slug}`}
                  className="text-blue-700 hover:underline"
                >
                  • {songTitleMap[slug] || slug}
                </Link>
              </li>
            ))
          )}
        </ul>

        {selectedSongs.length > 0 && (
          <button
            onClick={handleClear}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Clear Current Week
          </button>
        )}
      </div>
    </AuthGuard>
  );
}