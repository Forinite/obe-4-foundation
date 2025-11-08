//app/api/admin/delete/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing admin ID' }, { status: 400 });
        }

        // Fetch the admin first
        const admin = await client.fetch(`*[_type == "adminUser" && _id == $id][0]`, { id });
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        // Attempt delete
        const result = await client.delete(id);

        return NextResponse.json({ success: true, result });
    } catch (err: any) {
        console.error('❌ Delete admin error:', err);
        return NextResponse.json(
            {
                error: err.message || 'Failed to delete admin',
                details: err.response || err,
            },
            { status: 500 }
        );
    }
}
