import { getDailyVerse } from "./lib/bibleService";

export default async function HomePage() {
  const verse = await getDailyVerse();

  return (
    <div className="space-y-6">
      {/* Daily Verse */}
      <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur md:p-6">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          Daily Verse
        </h2>

        <p className="mb-2 text-lg font-semibold text-gray-800">
          {verse.reference}
        </p>

        <p className="whitespace-pre-line leading-8 text-gray-700">
          {verse.text}
        </p>
      </div>

      {/* Other content */}
      <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur md:p-6">
        <h2 className="text-2xl font-bold">Welcome</h2>
        <p className="mt-4 text-gray-600">
          This is your homepage content area.
        </p>
      </div>
    </div>
  );
}