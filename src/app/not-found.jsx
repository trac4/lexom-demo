import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='not-found'>

        <h1 id='code-404'>404</h1>
        <p>Uh oh, the page you are looking for does not exist!</p>
        <p>Or maybe it used to, but not anymore.</p>
        <Link href='/'>Return home</Link>
    </div>
  )
}
