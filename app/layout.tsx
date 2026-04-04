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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-gray-100">
        <div className="h-screen flex flex-col">
          {/* Top Bar */}
          <header className="flex items-center justify-between bg-blue-900 px-6 py-3 text-white shadow">
            {/* Left: Title */}
            <div>
              <h1 className="text-xl font-bold">Faith Prayer Worship</h1>
            </div>

            {/* Right: Search */}
            <div className="flex items-center">
              <TopBarSearch />
            </div>
          </header>

          {/* Main Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Menu */}
            <aside className="w-64 overflow-y-auto border-r bg-white p-4">
              <h2 className="mb-4 text-lg font-semibold">Menu</h2>

              <nav className="space-y-2">
                <a href="/" className="block rounded px-3 py-2 hover:bg-gray-100">
                  Home
                </a>

                <a href="/articles" className="block rounded px-3 py-2 hover:bg-gray-100">
                  Articles
                </a>

                <a
                  href="/prayer-notes"
                  className="block rounded px-3 py-2 hover:bg-gray-100"
                >
                  Prayer Notes
                </a>

                <div className="rounded px-3 py-2 font-medium text-gray-800">Worship</div>

                <div className="ml-4 space-y-1 border-l border-gray-200 pl-3">
                  <a href="/worship" className="block rounded px-3 py-2 text-sm hover:bg-gray-100">
                    Worship Songs
                  </a>
                  <a
                    href="/worship/current-week"
                    className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Current Week Worship Songs
                  </a>
                </div>

                <a href="/media" className="block rounded px-3 py-2 hover:bg-gray-100">
                  Media
                </a>
              </nav>
            </aside>

            {/* Center + Right Panel */}
            <div className="flex flex-1 overflow-hidden">
              {/* Center Main Content */}
              <main className="flex-1 overflow-y-auto p-6">{children}</main>

              {/* Right Side Utility Panel */}
              <aside className="w-72 overflow-y-auto border-l bg-gray-50 p-4">
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