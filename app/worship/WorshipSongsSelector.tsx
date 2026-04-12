"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { getUser } from "@/app/lib/auth";
import {
  appendCurrentWeekSongs,
  appendMultiWeekSongs,
} from "@/app/actions/songActions";

type Song = {
  slug: string;
  fileName: string;
  title: string;
};

type Props = {
  songs: Song[];
};

const letters = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

function formatDateLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNextThreeWeeks() {
  const today = new Date();
  const current = new Date(today);
  current.setHours(0, 0, 0, 0);

  const dayOfWeek = current.getDay(); // Sunday = 0
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  const firstSunday = new Date(current);
  firstSunday.setDate(current.getDate() + daysUntilSunday);

  return [0, 1, 2].map((offset) => {
    const nextWeek = new Date(firstSunday);
    nextWeek.setDate(firstSunday.getDate() + offset * 7);
    return formatDateLocal(nextWeek);
  });
}

export default function WorshipSongsSelector({ songs }: Props) {
  const user = getUser();
  const username = user?.username;

  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [week, setWeek] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isPending, startTransition] = useTransition();

  const allowedWeeks = useMemo(() => getNextThreeWeeks(), []);

  const filteredSongs = useMemo(() => {
    const q = activeSearch.trim().toLowerCase();

    return songs.filter((song) => {
      const title = song.title.toLowerCase();

      const matchesLetter =
        selectedLetter === "All" ||
        title.startsWith(selectedLetter.toLowerCase());

      const matchesSearch = !q || title.includes(q);

      return matchesLetter && matchesSearch;
    });
  }, [songs, selectedLetter, activeSearch]);

  const handleSearch = () => {
    setActiveSearch(searchInput);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
  };

  const handleCheckboxChange = (songSlug: string, checked: boolean) => {
    setSelectedSongs((prev) => {
      if (checked) {
        return [...new Set([...prev, songSlug])];
      }

      return prev.filter((slug) => slug !== songSlug);
    });
  };

  const handleAddToCurrentWeek = () => {
    setMessage("");

    if (!username) {
      setMessage("Please log in first.");
      return;
    }

    if (selectedSongs.length === 0) {
      setMessage("Please select at least one song.");
      setMessageType("error");
      return;
    }

    startTransition(async () => {
      const result = await appendCurrentWeekSongs(username, selectedSongs);
      setMessage(result.message || "Songs added to Current Week Plan.");
      setSelectedSongs([]);
    });
  };

const handleAddToMultiWeek = () => {
  setMessage("");

  if (!username) {
    setMessage("Please log in first.");
    return;
  }

if (!week) {
  setMessage("Please select a date.");
  setMessageType("error");
  return;
}

  if (selectedSongs.length === 0) {
    setMessage("Please select at least one song.");
    return;
  }

  startTransition(async () => {
    const result = await appendMultiWeekSongs(username, week, selectedSongs);

    setMessage(result.message || "Songs added to Multi-Week Plan.");
    setMessageType(result.success ? "success" : "error");

    if (result.success) {
      setSelectedSongs([]);
      setWeek("");
    }
  });
};

  return (
    <div className="overflow-hidden rounded-xl border bg-gray-50">
      <div className="border-b bg-white p-3 md:p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Search Songs"
              className="w-full rounded border bg-gray-100 px-3 py-2 text-sm text-black"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="rounded border bg-white px-4 py-2 text-sm font-medium text-blue-900 hover:bg-gray-100"
            >
              Go
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-2 pb-1">
              {letters.map((letter) => {
                const isActive = selectedLetter === letter;

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleLetterClick(letter)}
                    className={`rounded border px-3 py-1 text-sm ${
                      isActive
                        ? "border-blue-900 bg-blue-900 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-gray-600 md:text-sm">
            Showing {filteredSongs.length} song
            {filteredSongs.length === 1 ? "" : "s"}
            {selectedLetter !== "All" ? ` · Letter: ${selectedLetter}` : ""}
            {activeSearch.trim() ? ` · Search: "${activeSearch}"` : ""}
            {selectedSongs.length > 0
              ? ` · Selected: ${selectedSongs.length}`
              : ""}
          </div>
        </div>
      </div>

      <div className="max-h-[55vh] overflow-y-auto p-3 md:max-h-[420px] md:p-4">
        {filteredSongs.length === 0 ? (
          <div className="rounded-lg border bg-white p-4 text-sm text-gray-600">
            No songs found for the selected filter.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSongs.map((song) => (
              <label
                key={song.slug}
                className="flex items-center justify-between gap-3 rounded-lg border bg-white p-3 hover:bg-gray-50 md:p-4"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/worship/${song.slug}`}
                    className="block truncate text-sm font-semibold text-blue-700 md:text-lg"
                  >
                    {song.title}
                  </Link>
                </div>

                <input
                  type="checkbox"
                  checked={selectedSongs.includes(song.slug)}
                  onChange={(e) =>
                    handleCheckboxChange(song.slug, e.target.checked)
                  }
                  className="h-4 w-4 shrink-0 md:h-5 md:w-5"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t bg-white px-3 py-3 md:px-4">
        <div className="flex flex-col gap-3">

        <div
          className={`min-h-[20px] text-sm ${
            messageType === "error"
              ? "text-red-600 font-medium"
              : messageType === "success"
              ? "text-green-600 font-medium"
              : ""
          }`}
        >
          {message}
        </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:flex-wrap">
            <button
              type="button"
              onClick={handleAddToCurrentWeek}
              disabled={isPending}
              className="rounded bg-blue-900 px-4 py-2 text-sm text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Add to Current Week Plan"}
            </button>

            <input
              type="date"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="rounded border px-3 py-2 text-sm"
            />

            <button
              type="button"
              onClick={handleAddToMultiWeek}
              disabled={isPending}
              className="rounded bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-600 disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Add to Multi-Week Plan"}
            </button>
          </div>
          <div className="text-xs text-gray-500">
            You can plan songs for up to 3 future dates.
          </div>
        </div>
      </div>
    </div>
  );
}