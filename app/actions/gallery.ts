//app/actions/gallery.ts
'use server';

import { revalidatePath } from 'next/cache';
import { client } from '@/lib/sanity';

// 🔥 2 ACTIONS FOR GALLERY
export async function addGalleryImage(file: File) {
    // 🔥 FINAL FIX: MAP MIME TYPE TO "image"!
    const assetType = file.type.startsWith('image/') ? 'image' : 'file';

    const asset = await client.assets.upload(file, {
        contentType: file.type,
        filename: file.name,
        metadata: {
            type: assetType  // ✅ "image" STRING!
        }
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

    revalidatePath('/admin/dashboard/gallery');
}

export async function deleteGalleryImage(imageId: string) {
    await client.delete(imageId);
    revalidatePath('/admin/dashboard/gallery');
}