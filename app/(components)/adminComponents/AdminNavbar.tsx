//app/(components)/adminComponents/AdminNavbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Info,
    Phone,
    Image,
    LayoutGrid,
    Menu,
    ChevronLeft,
    UserIcon,
} from 'lucide-react';

import { signOut } from 'next-auth/react';




const links = [
    { href: '/admin/dashboard/Home', label: 'Home', icon: LayoutDashboard },
    { href: '/admin/dashboard/About', label: 'About', icon: Info },
    { href: '/admin/dashboard/Contact', label: 'Contact', icon: Phone },
    { href: '/admin/dashboard/Gallery', label: 'Gallery', icon: Image },
    { href: '/admin/dashboard/Footer', label: 'Footer', icon: LayoutGrid },
    { href: '/admin/dashboard/Admins', label: 'Admins', icon: UserIcon },
];

const AdminNavbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed z-50 top-0 left-0 h-full
          bg-white dark:bg-gray-800 shadow-md
          flex flex-col justify-between
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                    {!collapsed && (
                        <h1 className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                            Admin Panel
                        </h1>
                    )}
                    <button
                        className="lg:hidden text-gray-500 hover:text-cyan-500"
                        onClick={() => setMobileOpen(false)}
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        {links.map(({ href, label, icon: Icon }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/40 transition-colors group"
                                >
                                    <Icon
                                        size={20}
                                        className="text-cyan-600 dark:text-cyan-400 flex-shrink-0"
                                    />
                                    {!collapsed && (
                                        <span className="truncate text-sm font-medium">
                      {label}
                    </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                        <button
                            onClick={() => signOut({ callbackUrl: '/admin/login' })}
                            className="text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </ul>
                </nav>

                {/* Footer / Collapse Toggle */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-center">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-md bg-cyan-50 dark:bg-cyan-900/40 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition"
                    >
                        <ChevronLeft
                            size={18}
                            className={`text-cyan-600 dark:text-cyan-400 transition-transform duration-300 ${
                                collapsed ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                </div>
            </aside>

            {/* Top Bar for mobile */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md p-3 flex items-center justify-between lg:hidden">
                <button
                    className="text-gray-700 dark:text-gray-300"
                    onClick={() => setMobileOpen(true)}
                >
                    <Menu size={22} />
                </button>
                <h1 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">
                    Admin Dashboard
                </h1>
                <div className="w-6" />
            </div>
        </>
    );
};

export default AdminNavbar;
