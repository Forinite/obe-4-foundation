//app/api/donate/paypal/return/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { getAccessToken } from './route';

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

        if (!captureRes.ok || capture.status !== 'COMPLETED')
            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);

        const purchase = capture.purchase_units[0];
        const amount = Number(purchase.payments.captures[0].amount.value);
        const transactionId = purchase.payments.captures[0].id;

        // locate pending record via transactionId (order ID)
        const pending = await client.fetch `*[_type == "donation" && transactionId == $id][0]`, { id: token });
        if (!pending) return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);

        await client
            .patch(pending._id)
            .set({
                amount,
                status: 'completed',
                transactionId,
                metadata: { raw: JSON.stringify(capture) },
            })
            .commit();

        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=success&ref=${transactionId}`);
    } catch (err) {
        console.error(err);
        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error`);
    }
}