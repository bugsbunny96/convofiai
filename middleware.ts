import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const userSession = request.cookies.get('user_session');

  // Public routes that don't require authentication
  const publicRoutes = ['/auth', '/signup', '/forgot-password'];
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // Check if the route requires authentication
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If user is authenticated and tries to access auth pages, redirect to select-account
  if (isPublicRoute && token && !userSession) {
    return NextResponse.redirect(new URL('/select-account', request.url));
  }

  // If user is authenticated and has selected an account, redirect to dashboard
  if (isPublicRoute && token && userSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|logo.svg).*)'],
}; 