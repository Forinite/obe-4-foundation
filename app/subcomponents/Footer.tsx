//app/subcomponents/Footer.jsx
// app/subcomponents/Footer.jsx

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Shield, ArrowUpRight, Heart } from 'lucide-react';
import SocialLinks from "@/app/subcomponents/FooterComponents/SocialLinks";
import { programLinks, quickLinks } from "@/app/constants/footerLinks";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-24 bg-gradient-to-b from-white to-[#F8FAFC] border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

                {/* GRID */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                    {/* BRAND CARD */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                        <Link href="/" className="inline-flex items-center gap-3 mb-5">
                            <Image
                                src="/company-logo.webp"
                                width={150}
                                height={35}
                                alt="Dr. Obe Charity Foundation"
                                className="object-contain h-10 w-auto"
                            />
                        </Link>

                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                            Bridging the healthcare gap in underserved Nigerian communities through
                            preventive care, emergency services, and education.
                        </p>

                        {/* Social media icons you already created */}
                        <SocialLinks />
                    </div>

                    {/* QUICK LINKS */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <ArrowUpRight className="h-5 w-5 text-[#0A84FF]" />
                            Quick Links
                        </h3>

                        <ul className="space-y-4">
                            {quickLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-600 hover:text-[#0A84FF] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PROGRAMS */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-emerald-600" />
                            Our Programs
                        </h3>

                        <ul className="space-y-4">
                            {programLinks.map((item, index) => (
                                <li key={ index}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div className="bg-gradient-to-br lg:col-span-3 from-[#0A84FF] to-[#0052CC] text-white rounded-2xl p-8 shadow-md">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Contact Us
                        </h3>

                        <ul className="space-y-5 text-white/90">

                            {/* Phones */}
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 mt-[2px]" />
                                <div>
                                    <p className="text-sm font-medium">+234 903 008 3129</p>
                                    <p className="text-sm font-medium">+1 915 999 2005</p>
                                </div>
                            </li>

                            {/* Email */}
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4" />
                                <a
                                    href="mailto:obefoundation4charity@gmail.com"
                                    className="text-sm hover:underline"
                                >
                                    obefoundation4charity@gmail.com
                                </a>
                            </li>

                            {/* Address */}
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 mt-[2px]" />
                                <p className="text-sm leading-snug">
                                    170 Ademola Adetokunbo Crescent, Wuse 2, Abuja
                                    <br />
                                    14361 Earl Chokiski Ave, El Paso TX, USA
                                </p>
                            </li>
                        </ul>

                        {/* Impact Text */}
                        <div className="mt-6 border-t border-white/20 pt-4">
                            <p className="text-xs">
                                <Heart className="inline h-3 w-3 fill-white mr-1" />
                                Over 50,000 lives impacted across Nigeria.
                            </p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                    <p>© {currentYear} Dr. Obe Charity Foundation. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-[#0A84FF] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-[#0A84FF] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-[#0A84FF] transition-colors">
                            Transparency
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
