// middleware.js
import { NextResponse } from 'next/server';
// DO NOT import firebase-admin here!

// Define routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/profile']; // Example

export async function middleware(request) {
  const sessionCookie = request.cookies.get('__session')?.value;
  const requestedPath = request.nextUrl.pathname;

  // Check if the requested path is in the protected routes list
  const isProtectedRoute = PROTECTED_ROUTES.some(route => requestedPath.startsWith(route));

  if (isProtectedRoute) {
    // If accessing a protected route, check ONLY if the session cookie exists
    if (!sessionCookie) {
      // No session cookie found, redirect to the root login page without query params
      return NextResponse.redirect(new URL('/login', request.url));
    }
    

    // If the cookie EXISTS, allow the request to proceed.
    // The actual verification will happen in the Server Component or API route.
    return NextResponse.next();

  }

  // For unprotected routes (including '/', which handles login), allow the request to proceed
  return NextResponse.next();
}

// Configuration for middleware matcher (same as before)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};