// app/api/donate/paypal/verify/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { sendDonorEmail, sendAdminNotification } from '@/lib/email';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const reference = url.searchParams.get('reference');
    if (!reference) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);

    const existing = await client.fetch(`*[_type == "donation" && transactionId == $ref][0]`, { ref: reference });
    if (!existing) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);

    // Idempotency
    if (existing.status === 'completed') {
        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=success&ref=${reference}`);
    }

    try {
        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
        });
        const verify = await verifyRes.json();

        if (verifyRes.ok && verify.status === true && verify.data.status === 'success') {
            const amount = verify.data.amount / 100;
            const donorName = verify.data.metadata?.name || 'Supporter';
            const donorEmail = verify.data.customer?.email || existing.donorEmail;

            await client
                .patch(existing._id)
                .set({
                    donorName,
                    donorEmail,
                    amount,
                    status: 'completed',
                    metadata: { raw: JSON.stringify(verify) },
                })
                .commit();

            if (donorEmail) await sendDonorEmail({ to: donorEmail, name: donorName, amount, currency: verify.data.currency });
            await sendAdminNotification({
                to: process.env.ADMIN_EMAIL!,
                donorName,
                donorEmail,
                amount,
                currency: verify.data.currency,
                paymentMethod: 'Paystack',
                transactionId: reference,
            });

            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=success&ref=${reference}`);
        } else {
            // MARK AS FAILED
            await client
                .patch(existing._id)
                .set({
                    status: 'failed',
                    metadata: { error: verify.data?.gateway_response || 'Unknown' },
                })
                .commit();

            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=failed&ref=${reference}`);
        }
    } catch (err) {
        console.error(err);
        await client
            .patch(existing._id)
            .set({ status: 'failed', metadata: { error: 'Server error' } })
            .commit();
        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);
    }
}