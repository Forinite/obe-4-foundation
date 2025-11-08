// app/admin/dashboard/About/page.tsx

import { getAboutData } from '@/lib/sanity';
import AboutSection from './AboutSection';


export default async function AboutDashboard() {
    const aboutData = await getAboutData();

    return (
        <div className="flex  min-h-screen bg-gray-100 dark:bg-gray-900">

            {/* Main Content */}
            <main className="flex-1 md:p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">About Dashboard</h2>
                <AboutSection/>
            </main>
        </div>
    );
}