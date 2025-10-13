//app/hooks/useHomeData.ts

'use client'

import { useSanityData } from './useSanityData';
import { getHomeData } from '@/lib/sanity';
import { HomeData } from '@/app/types';

export function useHomeData() {
    return useSanityData<HomeData>(getHomeData);
}
