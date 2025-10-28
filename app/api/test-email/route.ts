// app/api/test-email

import { NextResponse } from 'next/server';
import { sendDonorEmail, sendAdminNotification } from '@/lib/email';

export async function GET() {
    try {
        await sendDonorEmail({
            to: 'test-donor@example.com',
            name: 'Test Donor',
            amount: 1000,
            currency: 'NGN',
        });

        await sendAdminNotification({
            to: process.env.ADMIN_EMAIL!,
            donorName: 'Test Donor',
            donorEmail: 'test@example.com',
            amount: 1000,
            currency: 'NGN',
            paymentMethod: 'Paystack',
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}