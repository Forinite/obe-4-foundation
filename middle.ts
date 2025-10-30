// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    // Allow login page
    if (pathname.startsWith('/admin/login')) {
        if (token) {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        }
        return NextResponse.next();
    }

    // Protect all /admin/dashboard/*
    if (pathname.startsWith('/admin/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};