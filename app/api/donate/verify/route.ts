// app/api/donate/verify/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { sendDonorEmail, sendAdminNotification } from '@/lib/email';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const reference = url.searchParams.get('reference');
        if (!reference) {
            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error&reason=no_reference`);
        }

        // Verify with Paystack
        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.data) {
            console.error('Paystack verify error:', verifyData);
            return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error&reason=verification_failed`);
        }

        const tx = verifyData.data;
        // tx.amount is in kobo/cents, convert to main unit
        const amount = tx.amount / 100;
        const currency = tx.currency || 'NGN';
        const donorName = tx.metadata?.name || tx.customer?.first_name || 'Supporter';
        const donorEmail = tx.customer?.email || tx.metadata?.email || tx.email || '';
        const paymentMethod = tx.channel || 'Paystack';

        // Create record in Sanity
        await client.create({
            _type: 'donation',
            donorName,
            donorEmail,
            message: tx.metadata?.message || '',
            amount,
            currency,
            paymentMethod,
            status: tx.status === 'success' ? 'completed' : 'failed',
            transactionId: tx.reference,
            date: new Date(tx.paid_at || Date.now()).toISOString(),
            metadata: { raw: JSON.stringify(tx) },
        });

        // Send emails
        try {
            if (donorEmail) {
                await sendDonorEmail({ to: donorEmail, name: donorName, amount, currency, transactionId: tx.reference });
            }
            await sendAdminNotification({
                to: process.env.ADMIN_EMAIL!,
                donorName,
                donorEmail,
                amount,
                currency,
                paymentMethod,
                transactionId: tx.reference,
            });
        } catch (emailErr) {
            console.error('Email send error:', emailErr);
        }

        // Redirect back to site with success query that UI can pick up
        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=success&reference=${tx.reference}`);
    } catch (err) {
        console.error(err);
        return NextResponse.redirect(`${process.env.APP_URL}/donate?status=error&reason=server`);
    }
}
