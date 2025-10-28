// app/api/donate/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            amount,
            currency = 'NGN',
            message,
            paymentMethod,
            csrfToken,
        } = body;

        const cookieStore = await cookies();
        const storedToken = cookieStore.get('csrf_token')?.value;
        if (!storedToken || storedToken !== csrfToken) {
            return NextResponse.json({ error: 'Invalid CSRF' }, { status: 403 });
        }

        if (!email || !amount) {
            return NextResponse.json({ error: 'Email & amount required' }, { status: 400 });
        }

        // ALLOW USD — Paystack accepts international cards
        const paystackAmount = Math.round(amount * 100);

        const pending = await client.create({
            _type: 'donation',
            donorName: name || 'Anonymous',
            donorEmail: email,
            message: message || '',
            amount,
            currency,
            paymentMethod: 'Paystack',
            status: 'pending',
            date: new Date().toISOString(),
        });

        const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                amount: paystackAmount,
                currency,
                callback_url: `${process.env.APP_URL}/api/donate/verify`,
                metadata: { name, message, sanityId: pending._id },
            }),
        });

        // ... inside try block, after initRes
        const data = await initRes.json();
        if (!initRes.ok) return NextResponse.json({ error: data.message }, { status: 500 });

        await client.patch(pending._id).set({ transactionId: data.data.reference }).commit();

        return NextResponse.json({
            authorization_url: data.data.authorization_url,
            reference: data.data.reference,
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}