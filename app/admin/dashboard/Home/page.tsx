// app/admin/dashboard/Home/page.tsx

import { getHomeData } from '@/lib/sanity';
import { HomeData } from '@/app/types';
import HomeSection from './HomeSection';
import Link from 'next/link';
import AdminNavbar from "@/app/(components)/adminComponents/AdminNavbar";

export default async function HomeDashboard() {
    const homeData = await getHomeData();

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/*/!* Sidebar *!/*/}
            {/*<AdminNavbar />*/}

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Home Dashboard</h2>
                <HomeSection data={homeData} />
            </main>
        </div>
    );
}