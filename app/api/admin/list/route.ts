// app/api/admin/list/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { client } from '@/lib/sanity';

export async function GET() {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const admins = await client.fetch(`*[_type == "adminUser"] { _id, name, email }`);
    return NextResponse.json({ admins });
}