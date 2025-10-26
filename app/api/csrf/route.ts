//app/api/csrf/route.ts


import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
    const token = crypto.randomBytes(32).toString('hex');

    const response = NextResponse.json({ token });

    response.cookies.set('csrf_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 15, // 15 minutes
        path: '/',
    });

    return response;
}