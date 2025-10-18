//app/api/gallery/add/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const assetType = file.type.startsWith('image/') ? 'image' : 'file';
        const asset = await client.assets.upload(assetType, file, {
            contentType: file.type,
            filename: file.name,
        });

        await client.create({
            _type: 'galleryImage',
            image: {
                _type: 'image',
                asset: {
                    _ref: asset._id,
                    _type: 'reference',
                },
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Error uploading image:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
