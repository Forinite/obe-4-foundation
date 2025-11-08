// app/admin/dashboard/Contact/page.tsx

import ContactSection from './ContactSection';

export default async function ContactDashboard() {


    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">


            {/* Main Content */}
            <main className="flex-1 md:p-8">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Dashboard</h2>
                <ContactSection  />
            </main>
        </div>
    );
}