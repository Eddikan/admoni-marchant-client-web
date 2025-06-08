import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admoni-token'); // Check for admoni-token cookie
  if (!token && !request.nextUrl.pathname.includes('auth')) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signin'; // Redirect to signin if token is missing
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signup'; // Redirect to `/auth/signup`
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow all other routes to continue
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: ['/', '/dashboard/:path*', '/orders/:path*', '/customers/:path*'], // Apply middleware to these paths
};