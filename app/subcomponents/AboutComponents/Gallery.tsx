//app/subcomponents/AboutComponents/Gallery.tsx


import { getGalleryImages } from '@/lib/sanity';
import GalleryClient from './GalleryClient';

export default async function Gallery() {
    const images = await getGalleryImages();

    // Handle empty state gracefully
    if (!images || images.length === 0) {
        return (
            <section className="py-20 text-center text-gray-500">
                <p>No gallery images available yet.</p>
            </section>
        );
    }

    return <GalleryClient images={images} />;
}
