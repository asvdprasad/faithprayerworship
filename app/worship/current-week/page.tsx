import Link from "next/link";
import { getAllSongs, getCurrentWeekSelection } from "../../lib/worshipService";
import { clearCurrentWeekSongs } from "../../actions/worshipActions";

export const dynamic = "force-dynamic";

export default async function CurrentWeekWorshipSongsPage() {
  const songs = getAllSongs();
  const selectedSongs = await getCurrentWeekSelection();

  const currentWeekSongs = songs.filter((song) =>
    selectedSongs.includes(song.slug)
  );

  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Current Week Worship Songs</h1>

        <form action={clearCurrentWeekSongs}>
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Clear Selection
          </button>
        </form>
      </div>

      <p className="mb-6 text-gray-600">Songs selected for the current week.</p>

      {currentWeekSongs.length === 0 ? (
        <p className="text-red-600">No songs selected for this week.</p>
      ) : (
        <div className="space-y-3">
          {currentWeekSongs.map((song) => (
            <div
              key={song.slug}
              className="rounded-lg border p-4 hover:bg-gray-50"
            >
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