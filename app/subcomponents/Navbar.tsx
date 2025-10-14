//app/subcomponents/Navbar.tsx


'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/app/constants/navLinks';
import { usePathname } from 'next/navigation';

const NewNavbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white border-b border-blue-300 shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/company-logo.webp"
                        alt="Logo"
                        width={120}
                        height={30}
                        className="object-contain h-[40px]"
                    />

                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${
                                    isActive
                                        ? 'bg-blue-100 border border-blue-300 text-blue-300'
                                        : 'text-blue-300 hover:bg-blue-100 border border-blue-300 hover:text-green-500'
                                }
                `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-md text-blue-300 hover:bg-[#f3e3f8] transition"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-full left-0 w-full bg-white border-t border-neutral-500 shadow-md md:hidden">
                    <div className="flex flex-col px-6 py-4 space-y-4">
                        {navLinks.map(link => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`block text-base font-medium px-3 py-2 rounded-lg transition-all
                    ${
                                        isActive
                                            ? 'bg-blue-100 border border-blue-300 text-blue-300'
                                            : 'text-blue-300 hover:bg-blue-100 border border-blue-300 hover:text-green-500'
                                    }
                  `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NewNavbar;
