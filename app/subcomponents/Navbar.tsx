//app/subcomponents/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, XIcon } from 'lucide-react';
import { navLinks } from '@/app/constants/navLinks';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    // Close menu on outside click
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isMobileMenuOpen]);

    // Close menu on link click
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            alt="Company Logo"
                            width={250}
                            height={22}
                            src="/company-logo.webp"
                            priority
                        />
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button
                            className=" relative z-50 p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            type="button"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? (
                                <XIcon className="h-6 w-6" />
                            ) : (
                                <MenuIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`fixed inset-y-0 right-0 z-40 w-screen h-fit bg-background/95 backdrop-blur border-l border-foreground/10 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0 left-0' : 'hidden translate-x-full'
                } md:hidden`}
            >
                <div className="flex flex-col h-full pt-16 px-4 ">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="py-3 text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium text-lg"
                            onClick={handleLinkClick}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
            {/* Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={toggleMobileMenu}
                    aria-hidden="true"
                />
            )}
        </nav>
    );
};

export default Navbar;