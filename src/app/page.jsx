import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-greeting">
      <section>
        <h2>Welcome</h2>
        <p>
          This is <b>Lexom,</b> a game that tests your ability to come up with
          words. Got a word you can think of that is obscure, lengthy,
          multisyllabic, or even all of the above? Well then, this game might
          just be for you!
        </p>
      </section>
      <section>
        <h2>How to Play</h2>
        <p>
          When playing, you will be asked to come up with a word that meets some
          certain criteria, such as a minimum length requirement, a required
          part of speech (i.e. a noun, adjective, etc.), ending or beginning
          with some specific letter(s), and more.
        </p>
        <p>
          From there, if the word is valid, you will receive a score. The longer, more polysyllabic, or
          rarer the word is, the higher your score will be.
        </p>
        <Link href="/game">Ready to play?</Link>
      </section>
    </div>
  );
}