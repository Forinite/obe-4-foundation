// app/(components)/donations/layout.tsx

import { ReactNode } from 'react';
import Navbar from '@/app/subcomponents/Navbar';
import Footer from '@/app/subcomponents/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Donations | Dr. Obe Charity Foundation',
    description: 'Support our mission by donating to healthcare and education initiatives.',
    keywords: ['donations', 'charity', 'support', 'Dr. Obe Foundation'],
    openGraph: {
        title: 'Donations | Dr. Obe Charity Foundation',
        description: 'Support our mission by donating to healthcare and education initiatives.',
        url: 'https://www.drobe-foundation.org/donations',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Dr. Obe Charity Foundation - Donations',
            },
        ],
    },
    alternates: {
        canonical: 'https://www.drobe-foundation.org/donations',
    },
};

export default async function DonationsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col  min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}