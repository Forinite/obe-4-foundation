//app/api/donate/paypal/return/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { sendDonorEmail, sendAdminNotification } from '@/lib/email';
import { getAccessToken } from '@/lib/paypal'; // ✅ import from helper

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    if (!token) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);

    try {
        const access = await getAccessToken();
        const captureRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${access}`, 'Content-Type': 'application/json' },
        });
        const capture = await captureRes.json();

        const existing = await client.fetch(`*[_type == "donation" && transactionId == $id][0]`, { id: token });
        if (!existing) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);

        if (captureRes.ok && capture.status === 'COMPLETED') {
            const purchase = capture.purchase_units[0];
            const amount = Number(purchase.payments.captures[0].amount.value);
            const transactionId = purchase.payments.captures[0].id;

            await client.patch(existing._id)
                .set({
                    amount,
                    status: 'completed',
                    transactionId,
                    metadata: { raw: JSON.stringify(capture) },
                })
                .commit();

            await sendDonorEmail({
                to: existing.donorEmail,
                name: existing.donorName,
                amount,
                currency: 'USD',
                transactionId,
            });

            await sendAdminNotification({
                to: process.env.ADMIN_EMAIL!,
                donorName: existing.donorName,
                donorEmail: existing.donorEmail,
                amount,
                currency: 'USD',
                paymentMethod: 'PayPal',
                transactionId,
            });

            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=success&ref=${transactionId}`);
        } else {
            await client.patch(existing._id)
                .set({
                    status: 'failed',
                    metadata: { error: JSON.stringify(capture) },
                })
                .commit();

            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=failed&ref=${token}`);
        }
    } catch (err) {
        console.error(err);
        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);
    }
}
