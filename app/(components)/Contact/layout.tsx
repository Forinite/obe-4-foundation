// app/(components)/contact/layout.tsx

import { ReactNode } from 'react';
import Navbar from '@/app/subcomponents/Navbar';
import Footer from '@/app/subcomponents/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Dr. Obe Charity Foundation',
    description: 'Get in touch with us for inquiries, partnerships, or support.',
    keywords: ['contact', 'charity', 'Dr. Obe Foundation'],
    openGraph: {
        title: 'Contact | Dr. Obe Charity Foundation',
        description: 'Get in touch with us for inquiries, partnerships, or support.',
        url: 'https://www.drobe-foundation.org/contact',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Dr. Obe Charity Foundation - Contact',
            },
        ],
    },
    alternates: {
        canonical: 'https://www.drobe-foundation.org/contact',
    },
};

export default async function ContactLayout({ children }: { children: ReactNode }) {
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