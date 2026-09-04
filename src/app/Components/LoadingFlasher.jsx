import React from 'react'

export default function LoadingFlasher({text}) {
  return (
    <div className="loading-text blink-smooth">
      <h1>{text}</h1>
    </div>
  )
}
