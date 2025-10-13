//app/hooks/useAboutData.ts

'use client';
import { useSanityData } from './useSanityData';
import { getAboutData } from '@/lib/sanity';
import { AboutData } from '@/app/types';

export function useAboutData() {
    return useSanityData<AboutData>(getAboutData);
}
