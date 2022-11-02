import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const homeUrl = new URL('/dashboard', request.url);
    const loginUrl = new URL('/auth/login', request.url);

    if (request.nextUrl.pathname.startsWith('/auth')) {
        if(request.cookies.get('token')) {
            return NextResponse.redirect(homeUrl);
        }
        
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/about') || request.nextUrl.pathname.startsWith('/dashboard')) {
        if(!request.cookies.get('token')) {
            return NextResponse.redirect(loginUrl);
        }
        
        return NextResponse.next();
    }
}

// Supports both a single string value or an array of matchers
/*export const config = {
    matcher: ['/about/:path*', '/dashboard/:path*'],
}*/