import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main-layout">
          <header>
            <div>
              <h1 id="Logo">
                <Link href="/">Lexom</Link>
              </h1>
              <nav>
                <Link href="/leaderboard">Leaderboard</Link>
                <Link href="/profile">Profile</Link>
              </nav>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
