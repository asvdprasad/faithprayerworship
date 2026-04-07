import Link from "next/link";
import {
  searchSongs,
  searchCurrentWeekSongs,
} from "../lib/worshipService";

export default async function GoogleSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || "";

  const worshipMatches = query ? searchSongs(query) : [];
  const currentWeekMatches = query ? await searchCurrentWeekSongs(query) : [];
  const googleUrl = query
    ? `https://www.google.com/search?q=${encodeURIComponent(query)}`
    : "";

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Google Search</h1>

        {!query ? (
          <p className="text-gray-600">Enter a search term in the top bar.</p>
        ) : (
          <>
            <p className="mb-4 text-gray-700">
              Search term: <span className="font-semibold">{query}</span>
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-900 px-4 py-2 text-white"
              >
                Open in Google
              </a>
            </div>
          </>
        )}
      </div>

      {query && (
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Matches in Worship Songs</h2>

          {worshipMatches.length === 0 ? (
            <p className="text-gray-600">No matching songs found.</p>
          ) : (
            <div className="space-y-3">
              {worshipMatches.map((song) => (
                <div key={song.slug} className="rounded border p-4">
                  <Link
                    href={`/worship/${song.slug}`}
                    className="text-lg font-semibold text-blue-700"
                  >
                    {song.title}
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {song.lyrics}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {query && (
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            Matches in Current Week Worship Songs
          </h2>

          {currentWeekMatches.length === 0 ? (
            <p className="text-gray-600">No matching songs found this week.</p>
          ) : (
            <div className="space-y-3">
              {currentWeekMatches.filter(Boolean).map((song) => (
                <div key={song.slug} className="rounded border p-4">
                  <Link
                    href={`/worship/current-week/${song.slug}`}
                    className="text-lg font-semibold text-blue-700"
                  >
                    {song.title}
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {song.lyrics}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}