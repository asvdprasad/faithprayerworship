import Link from "next/link";
import "./globals.css";
import TopBarSearch from "./components/TopBarSearch";
import DateTimeBox from "./components/DateTimeBox";
import SmallInfoBox from "./components/SmallInfoBox";
import WeatherBox from "./components/WeatherBox";

export const metadata = {
  title: "Faith Prayer Worship",
  description: "Faith, prayer, worship, and spiritual notes",
};

function DesktopMenu() {
  return (
    <nav className="space-y-2">
      <Link href="/" className="block rounded px-3 py-2 hover:bg-white/20">
        Home
      </Link>

      <Link
        href="/articles"
        className="block rounded px-3 py-2 hover:bg-white/20"
      >
        Articles
      </Link>

      <Link
        href="/prayer-notes"
        className="block rounded px-3 py-2 hover:bg-white/20"
      >
        Prayer Notes
      </Link>

      <div className="rounded px-3 py-2 font-medium text-white">Worship</div>

      <div className="ml-4 space-y-1 border-l border-white/30 pl-3">
        <Link
          href="/worship"
          className="block rounded px-3 py-2 text-sm hover:bg-white/20"
        >
          Worship Songs
        </Link>

        <Link
          href="/worship/current-week"
          className="block rounded px-3 py-2 text-sm hover:bg-white/20"
        >
          Current Week Worship Songs
        </Link>

        <Link
          href="/worship/add-song"
          className="block rounded px-3 py-2 text-sm hover:bg-white/20"
        >
          Add Worship Song
        </Link>
      </div>

      <Link
        href="/media"
        className="block rounded px-3 py-2 hover:bg-white/20"
      >
        Media
      </Link>
    </nav>
  );
}

function MobileMenu() {
  return (
    <div className="border-b border-blue-100 bg-white/85 p-4 backdrop-blur md:hidden">
      <details>
        <summary className="cursor-pointer text-lg font-semibold text-blue-900">
          Menu
        </summary>

        <div className="mt-3 text-blue-900">
          <nav className="space-y-2">
            <Link href="/" className="block rounded px-3 py-2 hover:bg-blue-50">
              Home
            </Link>

            <Link
              href="/articles"
              className="block rounded px-3 py-2 hover:bg-blue-50"
            >
              Articles
            </Link>

            <Link
              href="/prayer-notes"
              className="block rounded px-3 py-2 hover:bg-blue-50"
            >
              Prayer Notes
            </Link>

            <div className="rounded px-3 py-2 font-medium text-blue-900">
              Worship
            </div>

            <div className="ml-4 space-y-1 border-l border-blue-200 pl-3">
              <Link
                href="/worship"
                className="block rounded px-3 py-2 text-sm hover:bg-blue-50"
              >
                Worship Songs
              </Link>

              <Link
                href="/worship/current-week"
                className="block rounded px-3 py-2 text-sm hover:bg-blue-50"
              >
                Current Week Worship Songs
              </Link>

              <Link
                href="/worship/add-song"
                className="block rounded px-3 py-2 text-sm hover:bg-blue-50"
              >
                Add Worship Song
              </Link>
            </div>

            <Link
              href="/media"
              className="block rounded px-3 py-2 hover:bg-blue-50"
            >
              Media
            </Link>
          </nav>
        </div>
      </details>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-amber-50 text-gray-900">
        <div className="min-h-screen flex flex-col">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 border-b border-white/20 bg-gradient-to-r from-sky-600/75 via-blue-500/70 to-amber-300/70 px-4 py-3 text-white shadow backdrop-blur md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Faith Prayer Worship
                </h1>
                <p className="text-xs text-white/90 md:text-sm">
                  A place of hope, prayer, worship, and spiritual encouragement
                </p>
              </div>

              <div className="w-full md:w-auto">
                <TopBarSearch />
              </div>
            </div>
          </header>

          {/* Hero Banner */}
          <div className="relative w-full overflow-hidden">
            <img
              src="/images/faith-banner.png"
              alt="Faith Prayer Worship Banner"
              className="h-[230px] w-full object-cover object-center md:h-[340px]"
              // className="h-[150px] w-full object-center"
              // className="h-[200px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/15 via-transparent to-amber-100/20" />
            <div className="absolute inset-0 flex items-end justify-center p-4 md:p-8">
              <div className="rounded-2xl bg-white/20 px-4 py-3 text-center text-white shadow-lg backdrop-blur md:px-6">
                <h2 className="text-lg font-bold md:text-3xl">
                  Faith • Prayer • Worship
                </h2>
                <p className="mt-1 text-xs md:text-sm">
                  Hope-filled worship for every day and every season
                </p>
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex flex-1 flex-col md:flex-row">
            {/* Desktop Left Menu */}
            <aside className="hidden overflow-y-auto border-r border-white/30 bg-gradient-to-b from-sky-700 via-blue-700 to-sky-800 p-4 text-white md:block md:w-64 md:shrink-0">
              <h2 className="mb-4 text-lg font-semibold">Menu</h2>
              <DesktopMenu />
            </aside>

            {/* Main Content + Right Panel */}
            <div className="flex flex-1 flex-col md:flex-row">
              {/* Center Section */}
              <div className="flex min-w-0 flex-1 flex-col">
                <MobileMenu />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                  {children}
                </main>
              </div>

              {/* Right Side Utility Panel */}
              <aside className="w-full border-t border-blue-100 bg-white/65 p-4 backdrop-blur md:w-72 md:shrink-0 md:overflow-y-auto md:border-l md:border-t-0">
                <div className="space-y-4">
                  <DateTimeBox />
                  <WeatherBox />

                  <SmallInfoBox
                    title="Future Box 1"
                    content="Reserved for future use"
                  />

                  <SmallInfoBox
                    title="Future Box 2"
                    content="Reserved for future use"
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}