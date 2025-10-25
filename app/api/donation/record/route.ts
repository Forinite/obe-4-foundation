// app/api/donation/record/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { sendDonorEmail, sendAdminNotification } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, amount, currency = 'NGN', paymentMethod = 'CashApp', message } = body;

        if (!amount || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const created = await client.create({
            _type: 'donation',
            donorName: name || 'Anonymous',
            donorEmail: email,
            message: message || '',
            amount,
            currency,
            paymentMethod,
            status: 'pending', // admin should mark verified after checking CashApp
            date: new Date().toISOString(),
        });

        // Send emails (donor acknowledgement + admin)
        try {
            await sendDonorEmail({ to: email, name: name || 'Supporter', amount, currency, transactionId: undefined });
            await sendAdminNotification({
                to: process.env.ADMIN_EMAIL!,
                donorName: name,
                donorEmail: email,
                amount,
                currency,
                paymentMethod,
            });
        } catch (err) {
            console.error('Email error:', err);
        }

        return NextResponse.json({ success: true, created });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
