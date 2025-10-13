
// app/admin/dashboard/page.tsx
// app/admin/dashboard/page.tsx

'use client';

import React, { useState } from 'react';
import HomeDashboard from '@/app/admin/dashboard/Home/page';
import AboutDashboard from '@/app/admin/dashboard/About/page';
import ContactDashboard from '@/app/admin/dashboard/Contact/page';
// import DonationsDashboard from '@/app/admin/dashboard/Donations/page';
// import FooterDashboard from '@/app/admin/dashboard/Footer/page';
import { LayoutDashboard } from 'lucide-react';

// Define navigation items
const navItems = [
    { name: 'Home', key: 'home' },
    { name: 'About', key: 'about' },
    { name: 'Contact', key: 'contact' },
    { name: 'Donations', key: 'donations' },
    { name: 'Footer', key: 'footer' },
];

export default function Dashboard() {
    const [activePage, setActivePage] = useState<string>('home');
    const handleSetActivePage = (key: string) => {
        setActivePage(key);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            {/*<aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 fixed h-full">*/}
            {/*    <div className="flex items-center gap-2 mb-8">*/}
            {/*        <LayoutDashboard className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />*/}
            {/*        <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">Admin Dashboard</h1>*/}
            {/*    </div>*/}
            {/*    <nav>*/}
            {/*        <ul className="space-y-4">*/}
            {/*            {navItems.map((item) => (*/}
            {/*                <li key={item.key}>*/}
            {/*                    <button*/}
            {/*                        onClick={() => handleSetActivePage(item.key)}*/}
            {/*                        className={`text-lg ${*/}
            {/*                            activePage === item.key*/}
            {/*                                ? 'font-semibold text-cyan-600 dark:text-cyan-400 underline'*/}
            {/*                                : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'*/}
            {/*                        }`}*/}
            {/*                    >*/}
            {/*                        {item.name}*/}
            {/*                    </button>*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*</aside>*/}
            {/* Main Content */}
            {/*<main className="ml-64 flex-1 p-8">*/}
            {/*    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">*/}
            {/*        {activePage.charAt(0).toUpperCase() + activePage.slice(1)} Dashboard*/}
            {/*    </h2>*/}
            {/*    {activePage === 'home' && <HomeDashboard />}*/}
            {/*    {activePage === 'about' && <AboutDashboard />}*/}
            {/*    {activePage === 'contact' && <ContactDashboard />}*/}
            {/*    /!*{activePage === 'donations' && <DonationsDashboard />}*!/*/}
            {/*    /!*{activePage === 'footer' && <FooterDashboard />}*!/*/}
            {/*</main>*/}

            <HomeDashboard />
        </div>
    );
}