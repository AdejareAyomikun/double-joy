// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('access')?.value;
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith('/admin/dashboard')) {
//     if (!token) {
//       // No token? Send them to login
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }
//     // Token exists? Let them through
//     return NextResponse.next();
//   }

//   // 2. If the user is on the LOGIN page and already has a token
//   if (pathname === '/admin/login' && token) {
//     return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//   }

//   // 3. For any other page, just continue
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('access')?.value;
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith('/admin')) {
//     if (pathname === '/admin') {
//       if (token) return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//       return NextResponse.next();
//     }
//     if (!token) {
//       return NextResponse.redirect(new URL('/admin', request.url));
//     }
//   }

//   if (pathname.startsWith('/admin/dashboard')) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/admin', request.url));
//     }
//   }
//   const isUserProtected = pathname.startsWith('/profile') || pathname.startsWith('/checkout');

//   if (isUserProtected && !token) {
//     // Redirect regular users to the standard login page
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/profile/:path*', '/checkout/:path*', '/cart',]
// };


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//  const adminToken = request.cookies.get('admin_access')?.value;
//   const userToken = request.cookies.get('user_access')?.value;
//   const { pathname } = request.nextUrl;

//   // --- 1. ADMIN SECTION ---
//   if (pathname.startsWith('/admin')) {
//     // If on the admin login page (/admin)
//     if (pathname === '/admin') {
//       if (adminToken) return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//       return NextResponse.next();
//     }

//     // If on any other admin page, they MUST have a token
//     if (!adminToken) {
//       return NextResponse.redirect(new URL('/admin', request.url));
//     }
    
//     return NextResponse.next(); // Let them through to dashboard
//   }

//   // --- 2. USER SECTION ---
//   const isUserProtected = pathname.startsWith('/profile') || pathname.startsWith('/checkout');

//   if (isUserProtected && !userToken) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/profile/:path*', '/checkout/:path*'],
// };




// middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
  
//   // Get specific cookies
//   const adminToken = request.cookies.get('admin_access')?.value;
//   const userToken = request.cookies.get('user_access')?.value;

//   // 1. PUBLIC ROUTES - If they are here, do NOT redirect (Prevents the Loop)
//   if (pathname === '/admin' || pathname === '/login' || pathname === '/authentication/register') {
//     // Optional: If they ARE logged in as admin and try to go to /admin, send to dashboard
//     if (pathname === '/admin' && adminToken) {
//       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//     }
//     return NextResponse.next();
//   }

//   // 2. ADMIN PROTECTION
//   if (pathname.startsWith('/admin')) {
//     if (!adminToken) {
//       return NextResponse.redirect(new URL('/admin', request.url));
//     }
//     return NextResponse.next();
//   }

//   // 3. USER PROTECTION
//   const isUserProtected = pathname.startsWith('/profile') || pathname.startsWith('/checkout');
//   if (isUserProtected && !userToken) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   // Be very specific about what the middleware watches
//   matcher: ['/admin/:path*', '/profile/:path*', '/checkout/:path*'],
// };


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