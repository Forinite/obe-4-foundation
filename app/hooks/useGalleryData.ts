//app/hooks/useGalleryData.ts

'use client'

import { useSanityData } from './useSanityData';
import { getGalleryImages } from '@/lib/sanity';
import { GalleryImage } from '@/app/types';

export function useGalleryData() {
    return useSanityData<GalleryImage[]>(getGalleryImages);
}