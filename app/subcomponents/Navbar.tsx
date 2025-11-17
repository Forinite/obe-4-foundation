//app/subcomponents/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/app/constants/navLinks';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'auto';
    }, [open]);

    const closeMenu = () => setOpen(false);

    return (
        <nav className="fixed inset-x-0 top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-md z-50">
            <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <div className="relative flex items-center">
                        <Image
                            src="/company-logo.webp"
                            alt="Company Logo"
                            width={160}
                            height={45}
                            className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-4">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 text-[15px] font-medium rounded-lg relative transition-all
                                    ${isActive
                                    ? 'text-blue-600 font-semibold'
                                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                                }
                                `}
                            >
                                {link.label}

                                {/* Subtle underline for active item */}
                                {isActive && (
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[2px] bg-blue-600 rounded-full"></span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation menu"
                    className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <div
                className={`lg:hidden fixed inset-x-0 top-20 bg-white shadow-lg transition-all duration-300 origin-top
                    ${open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
                `}
            >
                <div className="px-6 py-6 space-y-2">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className={`block px-5 py-4 rounded-xl text-[17px] font-medium transition-all
                                    ${isActive
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                                }
                                `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
