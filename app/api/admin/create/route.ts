// app/api/admin/create/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password || password.length < 6) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        // Check if already exists
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

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Create admin error:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to create admin' },
            { status: 500 }
        );
    }
}