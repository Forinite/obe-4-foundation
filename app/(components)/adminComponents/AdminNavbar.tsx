import React from 'react'
import Link from "next/link";

const AdminNavbar = () => {
    return (
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 fixed h-full">
                <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-8">Admin Dashboard</h1>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                href="/admin/dashboard/Home"
                                className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard/About"
                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard/Contact"
                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard/Gallery"
                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard/Footer"
                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                            >
                                Footer
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
    )
}
export default AdminNavbar
