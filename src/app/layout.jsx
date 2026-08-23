import Link from "next/link";
import './globals.css'

export default function RootLayout({children}) {
  
  return (
    <html
      lang="en"
    >
      <body>
        
      
    <div className="main-layout">
      <header>
        <h1 id="Logo"><Link href= '/'>Lexom</Link></h1>
        <nav>
          <Link href="/game">Play Game</Link>
          <Link href="/leaderboard">Leaderboard</Link>
        </nav>
      </header>
    
    <main>
      {children}
    </main>
    </div>
    </body>
    </html>
  );
}


