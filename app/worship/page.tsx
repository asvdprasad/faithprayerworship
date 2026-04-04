import Link from "next/link";
import { getAllSongs } from "../lib/worshipService";

export default function WorshipPage() {
  const songs = getAllSongs();

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Worship Songs</h1>

      <div className="space-y-3">
        {songs.map((song) => (
          <div key={song.slug} className="border p-4 rounded hover:bg-gray-50">
            <Link
              href={`/worship/${song.slug}`}
              className="text-blue-700 font-semibold"
            >
              {song.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}