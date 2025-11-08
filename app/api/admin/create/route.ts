// app/api/admin/create/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

// --- Utility to get transporter ---
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

// --- Email helper ---
async function sendAdminWelcomeEmail({
                                         to,
                                         name,
                                         email,
                                         password,
                                     }: {
    to: string;
    name: string;
    email: string;
    password: string;
}) {
    const html = `
    <div style="background-color:#f8f7ff; padding:40px 0; font-family:'Inter',Arial,sans-serif;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.06); overflow:hidden;">
        
        <div style="background:linear-gradient(135deg,#7e5bef,#e26af9); color:white; text-align:center; padding:40px 20px;">
          <img src="/public/company-logo.webp" alt="Dr. Obe Foundation" style="width:80px; height:auto; margin-bottom:16px;" />
          <h1 style="margin:0; font-size:24px;">Welcome to Dr. Obe Foundation Admin Team</h1>
        </div>

        <div style="padding:30px; color:#333; line-height:1.7;">
          <p style="font-size:16px;">Dear <strong>${name}</strong>,</p>
          <p style="font-size:15px;">
            You have been added as an <strong>Administrator</strong> on the <strong>Dr. Obe Foundation</strong> platform.
          </p>
          <p style="font-size:15px;">Here are your login details:</p>

          <div style="background:#f3f2ff; padding:12px 16px; border-radius:8px; margin:18px 0; font-size:14px; color:#333;">
            <p style="margin:6px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin:6px 0;"><strong>Password:</strong> ${password}</p>
          </div>

          <div style="margin:30px 0; text-align:center;">
            <a href="https://obe4foundation.org/admin" 
               style="background:linear-gradient(135deg,#7e5bef,#e26af9); color:white; padding:14px 32px; border-radius:8px; 
                      text-decoration:none; font-weight:600; font-size:15px; display:inline-block;">
              Go to Admin Dashboard
            </a>
          </div>

          <p style="font-size:14px; color:#555;">Please log in and change your password immediately for security.</p>
          <p style="font-size:14px; margin-top:20px;">Welcome aboard,</p>
          <p style="font-weight:600; font-size:15px; color:#222;">Dr. Obe Foundation Team</p>
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
        subject: '🎉 You Have Been Added as an Admin — Dr. Obe Foundation',
        html,
    });
}

// --- Main API Route ---
export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password || password.length < 6) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const existing = await client.fetch(
            `*[_type == "adminUser" && email == $email][0]`,
            { email }
        );

        if (existing) {
            return NextResponse.json({ error: 'Admin already exists' }, { status: 409 });
        }

        const hash = await bcrypt.hash(password, 10);

        await client.create({
            _type: 'adminUser',
            name,
            email,
            password: hash,
        });

        // Send the welcome email
        await sendAdminWelcomeEmail({ to: email, name, email, password });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Create admin error:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to create admin' },
            { status: 500 }
        );
    }
}
