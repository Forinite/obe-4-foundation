// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendDonorEmail({ to, name, amount, currency, transactionId }: {
    to: string;
    name: string;
    amount: number;
    currency: string;
    transactionId?: string;
}) {
    const html = `
    <p>Dear ${name || 'Supporter'},</p>
    <p>Thank you for your generous donation of ${currency}${amount.toLocaleString()} to Dr. Obe Foundation.</p>
    <p>Transaction reference: ${transactionId || 'N/A'}</p>
    <p>With thanks,<br/>Dr. Obe Foundation</p>
  `;
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Thank you for your donation — Dr. Obe Foundation',
        html,
    });
}

export async function sendAdminNotification({ to, donorName, donorEmail, amount, currency, paymentMethod, transactionId }: {
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
      <li>Name: ${donorName || 'N/A'}</li>
      <li>Email: ${donorEmail || 'N/A'}</li>
      <li>Amount: ${currency}${amount.toLocaleString()}</li>
      <li>Method: ${paymentMethod}</li>
      <li>Transaction: ${transactionId || 'N/A'}</li>
    </ul>
  `;
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `New donation: ${currency}${amount.toLocaleString()}`,
        html,
    });
}
