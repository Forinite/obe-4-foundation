// app/admin/dashboard/Home/page.tsx

import HomeSection from './HomeSection';

export default async function HomeDashboard() {



    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

            <main className="md:p-8">
                <h2 className="md:text-3xl text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Home Dashboard</h2>
                <HomeSection />
            </main>
        </div>
    );
}