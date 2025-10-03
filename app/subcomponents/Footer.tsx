//app/subcomponents/Footer.jsx

import Image from 'next/image';
import SocialLinks from "@/app/subcomponents/FooterComponents/SocialLinks";
import QuickLinks from "@/app/subcomponents/FooterComponents/QuickLinks";
import ProgramLinks from "@/app/subcomponents/FooterComponents/ProgramLinks";
import SubscribeForm from "@/app/subcomponents/FooterComponents/SubscribeForm";
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";


const Footer: React.FC = () => {
    return (
        <footer className="relative bg-background/95 backdrop-blur-sm border-t border-border/50 mt-20">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="col-span-1 lg:col-span-2">
                        <div className="mb-4">
                            <a href="/" className="flex items-center space-x-2 mb-4">
                                <Image
                                    alt="Dr. Obe Charity Foundation Logo"
                                    width={120}
                                    height={24}
                                    src="/company-logo.webp"
                                    priority
                                />
                            </a>
                            <p className="text-sm text-foreground/70 font-medium">Transforming Rural Healthcare in Nigeria</p>
                        </div>
                        <p className="text-foreground/70 mb-6 max-w-md">
                            Bridging the healthcare gap in underserved rural communities through preventive care, emergency medical services, and community health education programs across Nigeria.
                        </p>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-3 text-sm text-foreground/70">
                                <MapPinIcon className="h-4 w-4 text-cyan-400" />
                                <span>170 Ademola Adetokunbo Crescent Wuse 2, Abuja, Nigeria</span>
                                <span>14361 Earl Chokiski Ave El Paso TX 79938, USA</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-foreground/70">
                                <PhoneIcon className="h-4 w-4 text-cyan-400" />
                                <span>+234 9030083129</span>
                                <span>+1 9159992005</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-foreground/70">
                                <EnvelopeIcon className="h-4 w-4 text-cyan-400" />
                                <span>obefoundation4charity@gmail.com</span>
                            </div>
                        </div>
                        <SocialLinks />
                    </div>
                    <QuickLinks />
                    <ProgramLinks />
                </div>
                <SubscribeForm />
                <div className="mt-12 pt-8 border-t border-border/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="text-foreground/70 text-sm mb-4 md:mb-0">
                            © 2025 Dr. Obe Charity Foundation. All rights reserved. | Registered NGO in Nigeria
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="#privacy" className="text-foreground/70 hover:text-cyan-400 transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="text-foreground/70 hover:text-cyan-400 transition-colors duration-200">
                                Terms of Service
                            </a>
                            <a href="#transparency" className="text-foreground/70 hover:text-cyan-400 transition-colors duration-200">
                                Financial Transparency
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;