// app/api/donate/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, amount, currency = 'NGN', message, paymentMethod } = body;

        if (!email || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const paystackAmount = currency === 'NGN' ? Math.round(amount * 100) : Math.round(amount * 100); // Paystack expects kobo/cents
        // Initialize transaction with Paystack
        const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                amount: paystackAmount, // in kobo/cents
                currency,
                callback_url: `${process.env.APP_URL}/api/donate/verify`, // Paystack redirects here with reference as query
                metadata: {
                    name,
                    message,
                    paymentMethod,
                },
            }),
        });

        const data = await initRes.json();
        if (!initRes.ok) {
            return NextResponse.json({ error: data.message || 'Paystack init failed', data }, { status: 500 });
        }

        // Optionally create a pending donation record in Sanity to track it
        // We'll create after verification to avoid storing failed attempts. If you want pending, uncomment:
        // await client.create({ _type: 'donation', donorName: name, donorEmail: email, amount, currency, paymentMethod, status: 'pending', date: new Date().toISOString() });

        return NextResponse.json({ authorization_url: data.data.authorization_url, reference: data.data.reference });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
