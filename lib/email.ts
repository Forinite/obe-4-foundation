// lib/email.ts

import nodemailer from 'nodemailer';

const escape = (str: string) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]!);

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

export async function sendDonorEmail({ to, name, amount, currency, transactionId }: {
    to: string; name: string; amount: number; currency: string; transactionId?: string;
}) {
    const html = `
    <p>Dear ${escape(name || 'Supporter')},</p>
    <p>Thank you for your generous donation of <strong>${currency}${amount.toLocaleString()}</strong> to Dr. Obe Foundation.</p>
    ${transactionId ? `<p>Transaction reference: <code>${escape(transactionId)}</code></p>` : ''}
    <p>With thanks,<br/>Dr. Obe Foundation</p>
  `;
    await getTransporter().sendMail({
        from: `"Dr. Obe Foundation" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Thank you for your donation — Dr. Obe Foundation',
        html,
    });
}

export async function sendAdminNotification({ to, donorName, donorEmail, amount, currency, paymentMethod, transactionId }: {
    to: string; donorName?: string; donorEmail?: string; amount: number; currency: string; paymentMethod: string; transactionId?: string;
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