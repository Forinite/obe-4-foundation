// app/lib/sanity.ts

import { createClient } from 'next-sanity';
import {HomeData, AboutData, ContactData, GalleryImage, FooterData, Service} from '@/app/types';
//
// export const client = createClient({
//     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ,
//     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//     apiVersion: '2025-02-19',
//     useCdn: false, // Use false for admin dashboard to ensure fresh data
// });

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2025-02-19',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN!,  // ← ADD ! to force token
});


export async function getHomeData(): Promise<HomeData> {
    return client.fetch(`
    *[_type == "home"][0] {
      _id,
      _type,
      missionStatements,
      missionInfo,
      services
    }
  `);
}

export async function getAboutData(): Promise<AboutData> {
    return client.fetch(`
    *[_type == "about"][0] {
      _id,
      _type,
      challengeData,
      objectives,
      approach
    }
  `);
}

export async function getContactData(): Promise<ContactData> {
    return client.fetch(`
    *[_type == "contact"][0] {
      _id,
      _type,
      generalInfo,
      faqs
    }
  `);
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
    return client.fetch(`
    *[_type == "galleryImage"] {
      _id,
      _type,
      image
    }
  `);
}

export async function getFooterData(): Promise<FooterData> {
    return client.fetch(`
    *[_type == "footer"][0] {
      _id,
      _type,
      quickLinks,
      programLinks
    }
  `);
}

// Add to your existing sanity.ts file

// import { client } from './sanity'; // Your existing client
