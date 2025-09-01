// src/middleware.ts
import { NextResponse } from 'next/server';

export function middleware() {
  // Just pass through all requests without modification
  return NextResponse.next();
}

export const config = {
  // Match all paths except static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
