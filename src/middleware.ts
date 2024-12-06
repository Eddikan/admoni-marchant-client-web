import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard'; // Redirect to `/dashboard`
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow all other routes to continue
}
// Specify which paths the middleware should apply to
export const config = {
  matcher: '/', // Apply middleware only to the root path
};