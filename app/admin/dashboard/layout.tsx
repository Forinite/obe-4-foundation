// app/(components)/about/page.tsx

import { ReactNode } from 'react';
import { Metadata } from 'next';
import AdminNavbar from "@/app/(components)/adminComponents/AdminNavbar";

export const metadata: Metadata = {
    title: 'Admin | Dr. Obe Charity Foundation',
    description: 'Administrator control and management.',
    keywords: ['admin', 'charity', 'mission', 'Dr. Obe Foundation'],
    openGraph: {
        title: 'Admin | Dr. Obe Charity Foundation',
        description: 'Administrator control and management .',
        url: 'https://www.drobe-foundation.org/admin/dashboard',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Dr. Obe Charity Foundation - Admin',
            },
        ],
    },
    alternates: {
        canonical: 'https://www.drobe-foundation.org/admin/dashboard',
    },
};

export default async function AboutLayout({ children }: { children: ReactNode }) {
    return (

        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminNavbar/>
            <main className={'ml-64'}> {children}</main>
        </div>
    );
}