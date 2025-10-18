//app/actions/contact.ts

'use server';

import { revalidatePath } from 'next/cache';
import { client } from '@/lib/sanity';

import { ContactData } from '@/app/types';

// 🔥 4 ACTIONS FOR CONTACT SECTION

// UPDATE GENERAL INFO
export async function updateGeneralInfo(data: {
    address1: string;
    address2: string;
    phone1: string;
    phone2: string;
    email: string;
    twitter: string;
    linkedin: string;
    openDays: { day: string; time: string }[];
    charity: string;
}) {
    const query = `*[_type == "contact"][0]`;
    const contact = await client.fetch(query);

    await client
        .patch(contact._id)
        .set({ generalInfo: data })
        .commit();

    revalidatePath('/admin/dashboard/contact');
}

// ADD FAQ
export async function addFAQ(faq: { question: string; answer: string }) {
    const query = `*[_type == "contact"][0]`;
    const contact = await client.fetch(query);

    const newFaqs = [...(contact?.faqs || []), faq];
    await client
        .patch(contact._id)
        .set({ faqs: newFaqs })
        .commit();

    revalidatePath('/admin/dashboard/contact');
}

// DELETE FAQ
export async function deleteFAQ(index: number) {
    const query = `*[_type == "contact"][0]`;
    const contact = await client.fetch(query);

    const newFaqs = contact.faqs.filter((_: any, i: number) => i !== index);
    await client
        .patch(contact._id)
        .set({ faqs: newFaqs })
        .commit();

    revalidatePath('/admin/dashboard/contact');
}

// UPDATE FAQ
export async function updateFAQ(index: number, faq: { question: string; answer: string }) {
    const query = `*[_type == "contact"][0]`;
    const contact = await client.fetch(query);

    const newFaqs = [...contact.faqs];
    newFaqs[index] = faq;

    await client
        .patch(contact._id)
        .set({ faqs: newFaqs })
        .commit();

    revalidatePath('/admin/dashboard/contact');
}