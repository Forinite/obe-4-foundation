// app/lib/sanity.ts

import { createClient } from 'next-sanity';
import { HomeData, AboutData, ContactData, GalleryImage, FooterData } from '@/app/types';

export const client = createClient({
    projectId: 'your_project_id',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
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