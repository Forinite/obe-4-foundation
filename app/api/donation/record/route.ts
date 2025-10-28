// app/api/donation/record/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { cookies } from 'next/headers';
import { sendDonorEmail, sendAdminNotification } from '@/lib/email';
import crypto from 'crypto';

const ALLOWED = ['CashApp', 'Bank Transfer'] as const;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, amount, currency = 'NGN', paymentMethod, message, csrfToken } = body;

        // AWAIT COOKIES
        const cookieStore = await cookies();
        const storedToken = cookieStore.get('csrf_token')?.value;

        if (!storedToken || storedToken !== csrfToken) {
            return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
        }

        if (!email || !amount || !ALLOWED.includes(paymentMethod as any)) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const doc = await client.create({
            _type: 'donation',
            donorName: name || 'Anonymous',
            donorEmail: email,
            message: message || '',
            amount,
            currency,
            paymentMethod,
            status: 'pending',
            date: new Date().toISOString(),
        });

        // Email will fail if SMTP not set — but don't crash
        try {
            await sendDonorEmail({ to: email, name: name || 'Supporter', amount, currency });
            await sendAdminNotification({
                to: process.env.ADMIN_EMAIL!,
                donorName: name,
                donorEmail: email,
                amount,
                currency,
                paymentMethod,
            });
        } catch (err) {
            console.warn('Email failed (SMTP not configured):', err);
        }

        return NextResponse.json({ success: true, id: doc._id });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}