import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_access')?.value;
  const userToken = request.cookies.get('user_access')?.value;
  const { pathname } = request.nextUrl;

  // 1. STOP THE LOOP: If we are on a login page, DO NOT RUN PROTECTIVE LOGIC
  if (pathname === '/admin' || pathname === '/login') {
    return NextResponse.next();
  }

  // 2. ADMIN PROTECTION: Only for sub-pages like /admin/dashboard
  if (pathname.startsWith('/admin/')) { 
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 3. USER PROTECTION
  const isUserProtected = pathname.startsWith('/profile') || pathname.startsWith('/checkout');
  if (isUserProtected && !userToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/checkout/:path*'],
};