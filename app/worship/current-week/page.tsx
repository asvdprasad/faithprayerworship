import Link from "next/link";
import { getCurrentWeekSongs } from "../../lib/worshipService";

export default function CurrentWeekWorshipSongsPage() {
  const songs = getCurrentWeekSongs();

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Current Week Worship Songs</h1>
      <p className="mb-6 text-gray-600">
        Select a song from this week&apos;s worship list.
      </p>

      {songs.length === 0 ? (
        <p className="text-red-600">
          No songs found in data/WorshipSongsThisWeek.
        </p>
      ) : (
        <div className="space-y-3">
          {songs.map((song) => (
            <div key={song.slug} className="rounded-lg border p-4 hover:bg-gray-50">
              <Link
                href={`/worship/current-week/${song.slug}`}
                className="text-lg font-semibold text-blue-700"
              >
                {song.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}