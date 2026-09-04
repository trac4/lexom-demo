import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-greeting">

      <section id="encourage-side">
        <div className="home-content">
        <h3> <Link href={'/login'}>Login</Link> or <Link href={'/signup'}>register</Link> in order to...</h3>
        <ul>
          <li>Put your verncular to the test</li>
          <li>Compete against other players</li>
          <li>Climb the leaderboards</li>
        </ul>
        </div>  
      </section>

      <section id="how-to-play-side">
        <div className="home-content">
        <h3>How to Play</h3>
        <p>
          The objective is basic, you will be asked to come up with and type a word that meets some
          certain criteria within a time limit. Such conditions can be a length requirement, a word beginning with specific letter(s), and more.
        </p>
        <p>
          From there, if the word is valid, you will receive a score, determined by word length, syllable count, and frequency. To score more, try to think of a word with uncommon letters, being uncommon in everyday use, or one that is sesquipedalian&mdash;in other words, long and polysyllabic. 
        </p>

        <p>For the most points, type a word that's all of the above!</p>
        </div>
      </section>
    </div>
  );
}