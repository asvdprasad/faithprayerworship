import Link from "next/link";
import { worshipSongs } from "@/data/worshipSongs";

export default function WorshipPage() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Worship Songs</h2>
      <p className="mb-6 text-gray-600">
        Select a song from the list below.
      </p>

      <div className="space-y-3">
        {worshipSongs.map((song) => (
          <div key={song.slug} className="rounded-lg border p-4 hover:bg-gray-50">
            <Link
              href={`/worship/${song.slug}`}
              className="text-lg font-semibold text-blue-700"
            >
              {song.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}