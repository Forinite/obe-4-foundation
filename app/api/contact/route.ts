// app/api/contact/route.ts
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const FOUNDATION_NAME = 'Dr. Obe Foundation';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'obefoundation4charity@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, subject, message, privacy } = body;

        if (!firstName || !lastName || !email || !subject || !message || !privacy) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        const mailOptions = {
            from: `"${FOUNDATION_NAME} Website" <${SMTP_USER}>`,
            to: ADMIN_EMAIL,
            subject: `🌍 ${FOUNDATION_NAME} Inquiry – ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2 style="color:#047857;">New Message from ${FOUNDATION_NAME} Website</h2>
          <p>
            <strong>Name:</strong> ${firstName} ${lastName}<br/>
            <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br/>
            <strong>Subject:</strong> ${subject}
          </p>
          <p style="margin-top:16px;"><strong>Message:</strong></p>
          <blockquote style="background:#f9fafb; padding:12px; border-left:4px solid #047857; color:#374151;">
            ${message}
          </blockquote>
          <p style="margin-top:24px; font-size:14px; color:#6b7280;">
            This message was submitted through the official ${FOUNDATION_NAME} website contact form.
          </p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('❌ Contact form error:', error);
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }
}
