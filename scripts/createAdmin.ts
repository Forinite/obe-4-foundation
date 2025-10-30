// scripts/createAdmin.ts

// scripts/createAdmin.ts
import { client } from '@/lib/sanity';
import bcrypt from 'bcrypt';

async function createAdmin() {
    // Debug: Print config
    console.log('Hey')
    console.log('Config:', {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        hasToken: !!process.env.SANITY_API_TOKEN,
    });

    if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) {
        console.error('Missing SANITY_PROJECT_ID or SANITY_DATASET in .env.local');
        process.exit(1);
    }

    const hash = await bcrypt.hash('admin123', 10);
    try {
        await client.create({
            _type: 'adminUser',
            name: 'Dr. Obe Admin',
            email: 'admin@drobe-foundation.org',
            password: hash,
        });
        console.log('Admin created: admin@drobe-foundation.org / admin123');
    } catch (err: any) {
        if (err.message.includes('duplicate')) {
            console.log('Admin already exists');
        } else {
            console.error('Create failed:', err.message);
        }
    }
}

createAdmin();