// app/(components)/about/page.tsx

import { ReactNode } from 'react';
import Navbar from '@/app/subcomponents/Navbar';
import Footer from '@/app/subcomponents/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Dr. Obe Charity Foundation',
    description: 'Learn about our mission, objectives, and approach to transforming communities.',
    keywords: ['about', 'charity', 'mission', 'Dr. Obe Foundation'],
    openGraph: {
        title: 'About | Dr. Obe Charity Foundation',
        description: 'Learn about our mission, objectives, and approach to transforming communities.',
        url: 'https://www.drobe-foundation.org/about',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Dr. Obe Charity Foundation - About',
            },
        ],
    },
    alternates: {
        canonical: 'https://www.drobe-foundation.org/about',
    },
};

export default async function AboutLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        </body>
        </html>
    );
}