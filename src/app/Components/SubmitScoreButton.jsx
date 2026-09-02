import React from 'react'

export default function SubmitScoreButton({submitScore}) {
  return (
    <div className="next-question" onClick={submitScore}>
      <p>Submit Score</p>
    </div>
  );
}
