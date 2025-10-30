// app/admin/dashboard/Admins/page.tsx

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminManagement from './AdminManagement';

export default async function AdminsPage() {
    const session = await getServerSession();
    if (!session) redirect('/admin/login');

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Manage Admins
                </h1>
                <AdminManagement />
            </div>
        </div>
    );
}