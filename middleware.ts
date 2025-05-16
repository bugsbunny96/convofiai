import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes
const PUBLIC_PATHS = ['/login', '/api', '/_next', '/favicon.ico', '/public'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for your own auth cookie/token here
  // For demo, we'll use a simple cookie check (replace with your real logic)
  const isLoggedIn = request.cookies.get('user_session'); // or whatever you use

  if (!isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except:
    // - /login
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /favicon.ico, /public, etc.
    '/((?!login|api|_next|favicon.ico|public).*)',
  ],
}; 