//app/subcomponents/Footer.jsx
import Image from 'next/image';
import SocialLinks from "@/app/subcomponents/FooterComponents/SocialLinks";
import QuickLinks from "@/app/subcomponents/FooterComponents/QuickLinks";
import ProgramLinks from "@/app/subcomponents/FooterComponents/ProgramLinks";
import SubscribeForm from "@/app/subcomponents/FooterComponents/SubscribeForm";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white text-gray-600 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Organization Info */}
                    <div className="space-y-5">
                        <a href="/" className="inline-flex items-center space-x-2">
                            <Image
                                alt="Dr. Obe Charity Foundation Logo"
                                width={130}
                                height={28}
                                src="/company-logo.webp"
                                className="object-contain"
                                priority
                            />
                        </a>

                        <p className="text-blue-400 font-medium text-sm uppercase tracking-wide">
                            Transforming Rural Healthcare in Nigeria
                        </p>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Bridging the healthcare gap in underserved communities through preventive care,
                            emergency medical services, and community health education across Nigeria.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm ">
                            <div className="flex items-start gap-3">
                                <MapPinIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <div>
                                    <p>170 Ademola Adetokunbo Crescent, Wuse 2, Abuja</p>
                                    <p>14361 Earl Chokiski Ave, El Paso TX, USA</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <PhoneIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <div>
                                    <p>+234 903 008 3129</p>
                                    <p>+1 915 999 2005</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <EnvelopeIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <p>obefoundation4charity@gmail.com</p>
                            </div>
                        </div>

                        <SocialLinks />
                    </div>

                    {/* Quick Links */}
                    <QuickLinks />

                    {/* Program Links */}
                    <ProgramLinks />

                    {/* Subscribe Form */}
                    <div className="space-y-4">
                        <h3 className="text-blue-400 font-semibold text-lg">Stay Updated</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Subscribe to receive stories and updates from our fieldwork and programs.
                        </p>
                        <SubscribeForm />
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500">
                        <p className="mb-4 md:mb-0">
                            © 2025 Dr. Obe Charity Foundation. All rights reserved.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <a
                                href="#privacy"
                                className="hover:text-blue-400 transition-colors duration-200"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#terms"
                                className="hover:text-blue-400 transition-colors duration-200"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#transparency"
                                className="hover:text-blue-400 transition-colors duration-200"
                            >
                                Transparency
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
