//app/actions/about.ts

'use server';

import { revalidatePath } from 'next/cache';
import { client } from '@/lib/sanity';

// import { AboutData } from '@/app/types';

// 🔥 5 ACTIONS FOR ABOUT SECTION

// ADD
export async function addObjective(objective: { icon: string; title: string; items: string[] }) {
    const query = `*[_type == "about"][0]`;
    const about = await client.fetch(query);

    const newObjectives = [...(about?.objectives || []), objective];
    await client
        .patch(about._id)
        .set({ objectives: newObjectives })
        .commit();

    revalidatePath('/admin/dashboard/about');
}

export async function addApproach(approach: { icon: string; title: string; description: string }) {
    const query = `*[_type == "about"][0]`;
    const about = await client.fetch(query);

    const newApproaches = [...(about?.approach || []), approach];
    await client
        .patch(about._id)
        .set({ approach: newApproaches })
        .commit();

    revalidatePath('/admin/dashboard/about');
}

// DELETE
export async function deleteObjective(index: number) {
    const query = `*[_type == "about"][0]`;
    const about = await client.fetch(query);

    const newObjectives = about.objectives.filter((_: any, i: number) => i !== index);
    await client
        .patch(about._id)
        .set({ objectives: newObjectives })
        .commit();

    revalidatePath('/admin/dashboard/about');
}

export async function deleteApproach(index: number) {
    const query = `*[_type == "about"][0]`;
    const about = await client.fetch(query);

    const newApproaches = about.approach.filter((_: any, i: number) => i !== index);
    await client
        .patch(about._id)
        .set({ approach: newApproaches })
        .commit();

    revalidatePath('/admin/dashboard/about');
}

// UPDATE
export async function updateChallengeData(data: {
    statistic: string;
    description: string;
    subDescription: string;
    items: { icon: string; text: string }[];
}) {
    const query = `*[_type == "about"][0]`;
    const about = await client.fetch(query);

    await client
        .patch(about._id)
        .set({ challengeData: data })
        .commit();

    revalidatePath('/admin/dashboard/about');
}

export async function updateObjective(index: number, objective: { icon: string; title: string; items: string[] }) {
    const query = `*[_type == "about"][0]`;
    const about = await client.fetch(query);

    const newObjectives = [...about.objectives];
    newObjectives[index] = objective;

    await client
        .patch(about._id)
        .set({ objectives: newObjectives })
        .commit();

    revalidatePath('/admin/dashboard/about');
}

export async function updateApproach(index: number, approach: { icon: string; title: string; description: string }) {
    const query = `*[_type == "about"][0]`;
    const about = await client.fetch(query);

    const newApproaches = [...about.approach];
    newApproaches[index] = approach;

    await client
        .patch(about._id)
        .set({ approach: newApproaches })
        .commit();

    revalidatePath('/admin/dashboard/about');
}