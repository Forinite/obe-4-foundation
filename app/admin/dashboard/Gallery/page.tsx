// app/admin/dashboard/Gallery/page.tsx

import { getGalleryImages } from '@/lib/sanity';
import GallerySection from './GallerySection';

export default async function GalleryDashboard() {
    return <GallerySection />;
}