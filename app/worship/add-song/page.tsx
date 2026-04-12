"use client";

import { useState } from "react";
import { addSong } from "../../actions/songActions";
import AuthGuard from "@/app/components/AuthGuard";

export default function AddSongPage() {
  const [songName, setSongName] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("lyrics", lyrics);

    const result = await addSong(formData);

    setMessage(result.message);

    if (result.success) {
      setSongName("");
      setLyrics("");
    }
  };

  return (
    <AuthGuard requiredRole="admin">
      <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur md:p-6">
        <h1 className="mb-4 text-2xl font-bold">Add Worship Song</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Song Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Song Name
            </label>
            <input
              type="text"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="mt-1 w-full rounded border bg-gray-100 px-3 py-2"
            />
          </div>

          {/* Lyrics */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lyrics
            </label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              rows={10}
              className="mt-1 w-full rounded border bg-gray-100 px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
          >
            Save Song
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-green-600">{message}</p>
        )}
      </div>
    </AuthGuard>
  );
}