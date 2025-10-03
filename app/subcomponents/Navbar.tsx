//app/subcomponents/Navbar.tsx

import Image from 'next/image';
import Link from 'next/link';
import {navLinks} from "@/app/constants/navLinks";
import {MenuIcon} from "lucide-react";

const Navbar: React.FC = () => {
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
                            className="p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
                            aria-label="Open menu"
                            type="button"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;