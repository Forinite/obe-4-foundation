//app/api/donate/paypal/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { cookies } from 'next/headers';

const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

// export async function getAccessToken() {
//     const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64');
//     const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
//         method: 'POST',
//         headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: 'grant_type=client_credentials',
//     });
//     const data = await res.json();
//     return data.access_token;
// }

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, amount, message, csrfToken } = body;

        const cookieStore = await cookies(); // ← AWAIT
        const storedToken = cookieStore.get('csrf_token')?.value;
        if (!storedToken || storedToken !== csrfToken)
            return NextResponse.json({ error: 'CSRF' }, { status: 403 });

        if (!email || !amount) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

        const pending = await client.create({
            _type: 'donation',
            donorName: name || 'Anonymous',
            donorEmail: email,
            message: message || '',
            amount,
            currency: 'USD',
            paymentMethod: 'PayPal',
            status: 'pending',
            date: new Date().toISOString(),
        });

        const accessToken = await getAccessToken();
        // ... inside the try block, after creating the pending record

        const amountStr = amount.toFixed(2);   // ← MUST be a string with 2 decimals

        const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: amountStr,               // ← STRING, not number
                        },
                    },
                ],
                application_context: {
                    brand_name: 'Dr. Obe Charity Foundation',
                    landing_page: 'BILLING',
                    user_action: 'PAY_NOW',
                    return_url: `${process.env.APP_URL}/api/donate/paypal/return`,
                    cancel_url: `${process.env.APP_URL}/donate?status=error`,
                    shipping_preference: 'NO_SHIPPING',
                },
            }),
        });

        const order = await orderRes.json();
        if (!orderRes.ok) return NextResponse.json({ error: order.message }, { status: 500 });

        await client.patch(pending._id).set({ transactionId: order.id }).commit();

        const approval = order.links.find((l: any) => l.rel === 'approve')?.href;
        return NextResponse.json({ approval_url: approval });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}