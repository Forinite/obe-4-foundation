// app/admin/dashboard/Contact/page.tsx

import { getContactData } from '@/lib/sanity';
import ContactSection from './ContactSection';

import AdminNavbar from "@/app/(components)/adminComponents/AdminNavbar";

export default async function ContactDashboard() {
    const contactData = await getContactData();

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/*/!* Sidebar *!/*/}
            {/*<AdminNavbar />*/}

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Dashboard</h2>
                <ContactSection data={contactData} />
            </main>
        </div>
    );
}