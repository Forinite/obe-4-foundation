// app/admin/dashboard/layout.tsx

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {ReactNode} from "react";
import AdminNavbar from "@/app/(components)/adminComponents/AdminNavbar";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Admin | Dr. Obe Charity Foundation',
    description: 'Administrator control and management.',
    keywords: ['admin', 'charity', 'mission', 'Dr. Obe Foundation'],
    openGraph: {
        title: 'Admin | Dr. Obe Charity Foundation',
        description: 'Administrator control and management.',
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


export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession();
    if (!session) redirect('/admin/login');

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminNavbar />
            <main className="flex-1 lg:ml-64 transition-all duration-300 ease-in-out pt-16 lg:pt-0 md:p-6 p-4">
                {children}
            </main>
        </div>
    );
}