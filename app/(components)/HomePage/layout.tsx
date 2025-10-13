// app/(component)/layout.tsx

import { ReactNode } from 'react';

import { Metadata } from 'next';
import Navbar from "@/app/subcomponents/Navbar";
import Footer from "@/app/subcomponents/Footer";

export const metadata: Metadata = {
    title: 'Dr. Obe Charity Foundation',
    description: 'Empowering communities through healthcare and education initiatives.',
    keywords: ['charity', 'healthcare', 'education', 'Dr. Obe Foundation'],
    openGraph: {
        title: 'Dr. Obe Charity Foundation',
        description: 'Empowering communities through healthcare and education initiatives.',
        url: 'https://www.drobe-foundation.org',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Dr. Obe Charity Foundation',
            },
        ],
    },
    alternates: {
        canonical: 'https://www.drobe-foundation.org',
    },
};

export default async function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <>
                <Navbar />
                    <main className="flex-grow">{children}</main>
                <Footer />
        </>
    );
}