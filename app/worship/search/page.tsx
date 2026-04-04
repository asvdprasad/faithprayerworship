import Link from "next/link";
import { searchSongs } from "../../lib/worshipService";

export default async function WorshipSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  const results = query ? searchSongs(query) : [];

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Search Worship Songs</h1>

      {query ? (
        <p className="mb-6 text-gray-600">
          Results for: <span className="font-semibold">{query}</span>
        </p>
      ) : (
        <p className="mb-6 text-gray-600">Enter a search term above.</p>
      )}

      {query && results.length === 0 && (
        <p className="text-red-600">No songs found in your WorshipSongs folder.</p>
      )}

      <div className="space-y-3">
        {results.map((song) => (
          <div key={song.slug} className="rounded-lg border p-4 hover:bg-gray-50">
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
    </div>
  );
}