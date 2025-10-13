//app/hooks/useContactData.ts

'use client';
import { useSanityData } from './useSanityData';
import { getContactData } from '@/lib/sanity';
import { ContactData } from '@/app/types';

export function useContactData() {
    return useSanityData<ContactData>(getContactData);
}
