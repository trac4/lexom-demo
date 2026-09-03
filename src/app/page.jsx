import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-greeting">

      <section>
        <h3> <Link href={'/login'}>Login</Link> or <Link href={'/login'}>Sign up</Link> in order to...</h3>
        <ul>
          <li>Put your verncular to the test</li>
          <li>Compete against other players</li>
          <li>Climb the leaderboards</li>
        </ul>  
      </section>
      <section>
        <h3>How to Play</h3>
        <p>
          The objective is basic, you will be asked to come up with and type word that meets some
          certain criteria within a time limit. Such conditions include a length requirement, a word beginning with specific letter(s), and more.
        </p>
        <p>
          From there, if the word is valid, you will receive a score, determined by word length, syllable count, and frequency. To score more, try to think of a word that uses uncommon letters or is uncommon in everyday use and sesquipedalian&mdash;in other words, a long polysyllabic word. 
        </p>
      </section>
    </div>
  );
}