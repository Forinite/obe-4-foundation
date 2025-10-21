// app/actions/home.ts
'use server';  // ← SERVER-ONLY!

import { client } from '@/lib/sanity';
import { getHomeData } from '@/lib/sanity';
import { revalidatePath } from 'next/cache';

export async function addMissionStatement(statement: string) {
    const home = await getHomeData();
    home.missionStatements.push(statement);
    await client.patch(home._id).set({ missionStatements: home.missionStatements }).commit();
    revalidatePath('/admin/dashboard');  // Refresh data
}

export async function deleteMissionStatement(index: number) {
    const home = await getHomeData();
    home.missionStatements.splice(index, 1);
    await client.patch(home._id).set({ missionStatements: home.missionStatements }).commit();
    revalidatePath('/admin/dashboard');
}

export async function updateMissionStatement(index: number, statement: string) {
    const home = await getHomeData();
    home.missionStatements[index] = statement;
    await client.patch(home._id).set({ missionStatements: home.missionStatements }).commit();
    revalidatePath('/admin/dashboard');
}

export async function addService(service: { icon: string; title: string; description: string }) {
    const home = await getHomeData();
    home.services.push(service);
    await client.patch(home._id).set({ services: home.services }).commit();
    revalidatePath('/admin/dashboard');
}

export async function deleteService(index: number) {
    const home = await getHomeData();
    home.services.splice(index, 1);
    await client.patch(home._id).set({ services: home.services }).commit();
    revalidatePath('/admin/dashboard');
}

export async function updateService(index: number, service: { icon: string; title: string; description: string }) {
    const home = await getHomeData();
    home.services[index] = service;
    await client.patch(home._id).set({ services: home.services }).commit();
    revalidatePath('/admin/dashboard');
}

export async function updateMissionInfo(info: { percentage: number; text: string; list: string[] }) {
    const home = await getHomeData();
    await client.patch(home._id).set({ missionInfo: info }).commit();
    revalidatePath('/admin/dashboard');
}

// 🔹 ✅ NEW: Update Vision Statement
export async function updateVisionStatement(vision: {
    title: string;
    mainStatement: string;
    highlight: string;
    goals: string[];
}) {
    const home = await getHomeData();
    await client
        .patch(home._id)
        .set({ visionStatement: vision })
        .commit();
    revalidatePath('/admin/dashboard');
}