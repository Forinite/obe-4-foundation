// app/api/donate/paypal/verify/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { sendDonorEmail, sendAdminNotification } from '@/lib/email';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const reference = url.searchParams.get('reference');
    if (!reference) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error&reason=no_ref`);

    // Idempotency – if already processed, just redirect
    const existing = await client.fetch(`*[_type == "donation" && transactionId == $ref && status == "completed"][0]`, { ref: reference });
    if (existing) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=success&reference=${reference}`);

    try {
        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
        });
        const verify = await verifyRes.json();
        if (!verifyRes.ok || verify.status !== true)
            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error&reason=verify`);

        const tx = verify.data;
        const amount = tx.amount / 100;
        const donorName = tx.metadata?.name || tx.customer?.first_name + ' ' + (tx.customer?.last_name || '') || 'Supporter';
        const donorEmail = tx.customer?.email || '';

        // locate pending record (created in /api/donate)
        const pending = await client.fetch(`*[_type == "donation" && transactionId == $ref][0]`, { ref: reference });
        if (!pending) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error&reason=no_pending`);

        await client
            .patch(pending._id)
            .set({
                donorName,
                donorEmail,
                amount,
                status: tx.status === 'success' ? 'completed' : 'failed',
                metadata: { raw: JSON.stringify(tx) },
            })
            .commit();

        // emails
        if (donorEmail) await sendDonorEmail({ to: donorEmail, name: donorName, amount, currency: 'NGN', transactionId: reference });
        await sendAdminNotification({
            to: process.env.ADMIN_EMAIL!,
            donorName,
            donorEmail,
            amount,
            currency: 'NGN',
            paymentMethod: tx.channel || 'Paystack',
            transactionId: reference,
        });

        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=success&reference=${reference}`);
    } catch (err) {
        console.error(err);
        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error&reason=server`);
    }
}