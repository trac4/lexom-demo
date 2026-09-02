import React from 'react'

export default function NextQuestionButton({setQuestionNum, setTime, timeLimit, setFetchedPrompt, setAnswer}) {
  return (
    <div
      className="next-question"
      onClick={() => {
        setQuestionNum((prev) => prev + 1);
        setTime(timeLimit);
        setFetchedPrompt(true);
        setAnswer(null);
      }}>
      <p>Next Question</p>
    </div>
  );
}
