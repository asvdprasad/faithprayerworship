import Link from "next/link";
import "./globals.css";
import TopBarSearch from "./components/TopBarSearch";

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
            <aside className="w-64 bg-white border-r p-4 overflow-y-auto">
              <h2 className="mb-4 text-lg font-semibold">Menu</h2>

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

                {/* Worship Section */}
                <div className="rounded px-3 py-2 font-medium text-gray-800">
                  Worship
                </div>

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
            </aside>

            {/* Center Section */}
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}