 // app/api/donation/cashapp/route.ts
 import { NextRequest, NextResponse } from 'next/server';

 const CASHAPP_API ='https://api.cash.app/v1/payments'
 // const CASHAPP_API ='https://sandbox.api.cash.app/v1/payments';


 export async function POST(req: NextRequest) {
     const body = await req.json();
     const { grantId, amount, currency, name, email, message, referenceId, csrfToken } = body;

     // Verify CSRF (your own logic)
     if (!csrfToken || csrfToken !== process.env.CSRF_SECRET) {
         return NextResponse.json({ error: 'Invalid security token' }, { status: 403 });
     }

     try {
         const res = await fetch(CASHAPP_API, {
             method: 'POST',
             headers: {
                 'Authorization': `Bearer ${process.env.CASHAPP_ACCESS_TOKEN}`,
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 grant_id: grantId,
                 amount: { currency, value: Math.round(amount * 100) },
                 scope_id: process.env.MERCHANT_ID,
                 reference_id: referenceId,
             }),
         });

         const data = await res.json();
         if (!res.ok) throw new Error(data.message || 'Payment failed');

         // Save donation in your DB
         // await db.donation.create({ ... })

         return NextResponse.json({ success: true, paymentId: data.id });
     } catch (err: any) {
         return NextResponse.json({ error: err.message }, { status: 400 });
     }
 }