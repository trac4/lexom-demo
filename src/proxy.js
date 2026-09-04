import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const path = request.nextUrl.pathname //slightly different from the tutorial, pathname can be found like this 
//   console.log(request.nextUrl)

  const isPublicPath = (path === '/login' || path === '/signup' || path === '/')

  //also different from tutorial, where grabbing token value from request headers is async (not the case in tutorial). entire function becomes asynchronous as a result
  const token = await request.cookies.get('token')?.value || '' 

  if (isPublicPath && token) return NextResponse.redirect(new URL('/profile', request.nextUrl)) //user should not be able to access login/signup if already signed in
  if (!isPublicPath && !token) return NextResponse.redirect(new URL('/login', request.nextUrl)) //all other routes are restricted to registered users, this will force them to the login page
}


// middleware runs on the following pages
export const config = {
  matcher: [
    '/',
    '/profile',
    '/game',
    '/login',
    '/signup',
  ],
}