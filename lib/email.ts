// lib/email.ts

import nodemailer from 'nodemailer';

const escape = (str: string) =>
    str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]!);

let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
    }
    return transporter;
}

export async function sendDonorEmail({
                                         to,
                                         name,
                                         amount,
                                         currency,
                                         transactionId,
                                     }: {
    to: string;
    name: string;
    amount: number;
    currency: string;
    transactionId?: string;
}) {
    const html = `
  <div style="background-color:#f8f7ff; padding:40px 0; font-family:'Inter',Arial,sans-serif;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.06); overflow:hidden;">
      
      <div style="background:linear-gradient(135deg,#7e5bef,#e26af9); color:white; text-align:center; padding:40px 20px;">
        <img src="https://i.imgur.com/9Pfj9tT.png" alt="Dr. Obe Foundation" style="width:80px; height:auto; margin-bottom:16px;" />
        <h1 style="margin:0; font-size:26px; letter-spacing:0.5px;">Thank You for Your Donation!</h1>
      </div>

      <div style="padding:30px 30px 40px 30px; color:#333; line-height:1.7;">
        <p style="font-size:17px;">Dear <strong>${escape(name || 'Supporter')}</strong>,</p>
        <p style="font-size:16px;">
          On behalf of <strong>Dr. Obe Foundation</strong>, we want to express our deepest gratitude for your generous donation of 
          <strong style="color:#7e5bef;">${currency}${amount.toLocaleString()}</strong>.
        </p>
        
        ${
        transactionId
            ? `<p style="font-size:14px; color:#666;">Transaction Reference: 
                     <code style="background:#f3f2ff; padding:2px 6px; border-radius:4px; color:#5a46d0;">${escape(transactionId)}</code>
                   </p>`
            : ''
    }

        <div style="margin:30px 0; text-align:center;">
          <a href="https://obe4foundation.org" 
             style="background:linear-gradient(135deg,#7e5bef,#e26af9); color:white; padding:14px 32px; border-radius:8px; 
                    text-decoration:none; font-weight:600; font-size:15px; display:inline-block;">
            Visit Our Website
          </a>
        </div>

        <p style="font-size:15px; color:#555;">
          Your donation helps us continue our mission to support education, healthcare, and community upliftment.
        </p>

        <p style="font-size:15px; margin-top:20px;">With heartfelt thanks,</p>
        <p style="font-weight:600; font-size:16px; color:#222;">Dr. Obe Foundation Team</p>
      </div>

      <div style="background:#f1efff; text-align:center; padding:15px 10px; font-size:13px; color:#777;">
        © ${new Date().getFullYear()} Dr. Obe Foundation · All Rights Reserved
      </div>
    </div>
  </div>
  `;

    await getTransporter().sendMail({
        from: `"Dr. Obe Foundation" <${process.env.SMTP_USER}>`,
        to,
        subject: '💜 Thank You for Your Donation — Dr. Obe Foundation',
        html,
    });
}

export async function sendAdminNotification({
                                                to,
                                                donorName,
                                                donorEmail,
                                                amount,
                                                currency,
                                                paymentMethod,
                                                transactionId,
                                            }: {
    to: string;
    donorName?: string;
    donorEmail?: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    transactionId?: string;
}) {
    const html = `
    <p>A new donation has been received.</p>
    <ul>
      <li>Name: ${escape(donorName || 'N/A')}</li>
      <li>Email: ${escape(donorEmail || 'N/A')}</li>
      <li>Amount: ${currency}${amount.toLocaleString()}</li>
      <li>Method: ${escape(paymentMethod)}</li>
      ${transactionId ? `<li>Transaction: <code>${escape(transactionId)}</code></li>` : ''}
    </ul>
  `;
    await getTransporter().sendMail({
        from: `"Dr. Obe Foundation" <${process.env.SMTP_USER}>`,
        to,
        subject: `New donation: ${currency}${amount.toLocaleString()}`,
        html,
    });
}
