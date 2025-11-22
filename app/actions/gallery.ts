//app/actions/gallery.ts
'use server';

import { revalidatePath } from 'next/cache';
import { client } from '@/lib/sanity';

export async function addGalleryImages(files: File[], captions: string[] = []) {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const caption = captions[i]?.trim() || undefined;

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
            caption, // ← NEW
        });
    }

    revalidatePath('/admin/dashboard/gallery');
}

export async function deleteGalleryImage(imageId: string) {
    await client.delete(imageId);
    revalidatePath('/admin/dashboard/gallery');
}

// Update
export async function updateGalleryImageCaption(imageId: string, caption: string | null) {
    await client
        .patch(imageId)
        .set({ caption })
        .commit();

    revalidatePath('/admin/dashboard/gallery');
}

// ✅ NEW: Batch delete
export async function deleteGalleryImages(imageIds: string[]) {
    if (!imageIds || imageIds.length === 0) return;

    await Promise.all(
        imageIds.map((id) => client.delete(id))
    );

    revalidatePath('/admin/dashboard/gallery');
}
