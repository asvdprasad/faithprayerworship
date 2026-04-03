export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">Faith Prayer Worship</h1>
        <p className="mt-4 text-lg">
          Welcome to FaithPrayerWorship.org — a place for faith, prayer,
          worship, devotionals, and spiritual notes.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border p-5">
            <h2 className="text-xl font-semibold">Articles</h2>
            <p className="mt-2 text-sm">
              Read faith-based articles, teachings, and reflections.
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <h2 className="text-xl font-semibold">Prayer Notes</h2>
            <p className="mt-2 text-sm">
              Short prayer points, meditations, and spiritual reminders.
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <h2 className="text-xl font-semibold">Media</h2>
            <p className="mt-2 text-sm">
              Worship media, PDFs, and downloadable resources.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}