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
      <Link href="/" className="block rounded px-3 py-2 hover:bg-gray-100">
        Home
      </Link>

      <Link
        href="/articles"
        className="block rounded px-3 py-2 hover:bg-gray-100"
      >
        Articles
      </Link>

      <Link
        href="/prayer-notes"
        className="block rounded px-3 py-2 hover:bg-gray-100"
      >
        Prayer Notes
      </Link>

      <div className="rounded px-3 py-2 font-medium text-gray-800">Worship</div>

      <div className="ml-4 space-y-1 border-l border-gray-200 pl-3">
        <Link
          href="/worship"
          className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
        >
          Worship Songs
        </Link>

        <Link
          href="/worship/current-week"
          className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
        >
          Current Week Worship Songs
        </Link>
      </div>

      <Link
        href="/media"
        className="block rounded px-3 py-2 hover:bg-gray-100"
      >
        Media
      </Link>
    </nav>
  );
}

function MobileMenu() {
  return (
    <div className="border-b bg-white p-4 md:hidden">
      <details>
        <summary className="cursor-pointer text-lg font-semibold text-gray-800">
          Menu
        </summary>

        <div className="mt-3">
          <DesktopMenu />
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
      <body className="min-h-screen bg-gray-100">
        <div className="min-h-screen flex flex-col">
          {/* Top Bar */}
          <header className="bg-blue-900 px-4 py-3 text-white shadow md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold">Faith Prayer Worship</h1>
              </div>

              <div className="w-full md:w-auto">
                <TopBarSearch />
              </div>
            </div>
          </header>

          {/* Main Area */}
          <div className="flex flex-1 flex-col md:flex-row">
            {/* Desktop Left Menu */}
            <aside className="hidden md:block md:w-64 md:shrink-0 overflow-y-auto border-r bg-white p-4">
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
              <aside className="w-full border-t bg-gray-50 p-4 md:w-72 md:shrink-0 md:overflow-y-auto md:border-l md:border-t-0">
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