// app/api/donate/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { cookies } from 'next/headers';
import crypto from 'crypto';


function validateCsrf(token: string) {
    const cookie = cookies().get('csrf_token')?.value;
    return cookie && crypto.timingSafeEqual(Buffer.from(cookie), Buffer.from(token));
}

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

        if (!validateCsrf(csrfToken))
            return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });

        if (!email || !amount || currency !== 'NGN')
            return NextResponse.json({ error: 'NGN & email required' }, { status: 400 });

        // Create pending record
        const pending = await client.create({
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

        const paystackAmount = Math.round(amount * 100);
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
                metadata: { name, message, paymentMethod, sanityId: pending._id },
            }),
        });

        const data = await initRes.json();
        if (!initRes.ok) return NextResponse.json({ error: data.message }, { status: 500 });

        // Store reference on pending doc
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