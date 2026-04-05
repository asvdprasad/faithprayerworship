"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useTransition } from "react";
import { setCurrentWeekSongs } from "../actions/worshipActions";

type Song = {
  slug: string;
  fileName: string;
  title: string;
};

type Props = {
  songs: Song[];
};

const letters = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export default function WorshipSongsSelector({ songs }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

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

  const handleSubmit = (formData: FormData) => {
    setMessage("");

    startTransition(async () => {
      await setCurrentWeekSongs(formData);

      formRef.current?.reset();
      setMessage("Current week worship songs saved successfully.");
    });
  };

  return (
    <form ref={formRef} action={handleSubmit}>
      <div className="overflow-hidden rounded-xl border bg-gray-50">
        {/* Top controls */}
        <div className="border-b bg-white p-3 md:p-4">
          <div className="flex flex-col gap-3">
            {/* Search row */}
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

            {/* Alphabet row */}
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
                          ? "bg-blue-900 text-white border-blue-900"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter status */}
            <div className="text-xs text-gray-600 md:text-sm">
              Showing {filteredSongs.length} song
              {filteredSongs.length === 1 ? "" : "s"}
              {selectedLetter !== "All" ? ` · Letter: ${selectedLetter}` : ""}
              {activeSearch.trim() ? ` · Search: "${activeSearch}"` : ""}
            </div>
          </div>
        </div>

        {/* Scrollable songs list */}
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
                    name="selectedSongs"
                    value={song.slug}
                    className="h-4 w-4 shrink-0 md:h-5 md:w-5"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Bottom action bar */}
        <div className="border-t bg-white px-3 py-3 md:px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-[20px] text-sm text-green-600">
              {message}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded bg-blue-900 px-4 py-2 text-sm text-white hover:bg-blue-800 disabled:opacity-60 md:w-auto md:text-base"
            >
              {isPending
                ? "Saving..."
                : "Set as Current Week Worship Songs"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}