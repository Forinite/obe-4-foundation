//app/subcomponents/ContactComponents/ContactInfoCard.tsx

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface ContactInfoCardProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    className?: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
                                                             icon: Icon,
                                                             title,
                                                             subtitle,
                                                             children,
                                                             className,
                                                         }) => {
    return (
        <div
            className={cn(
                'relative overflow-hidden bg-background/60 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 cursor-default select-none text-sm transition-transform hover:scale-[1.01] hover:shadow-lg hover:border-cyan-400/40',
                className,
            )}
        >
            {/* Subtle decorative shapes */}
            <svg
                className="absolute top-0 left-0 w-32 h-32 text-cyan-400/10"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M40,-60C55,-45,70,-30,76,-10C82,10,79,35,67,52C55,69,35,78,15,81C-5,84,-25,81,-45,71C-65,61,-85,45,-91,24C-97,3,-89,-22,-75,-41C-61,-60,-41,-73,-21,-78C-1,-83,19,-80,40,-60Z"
                    transform="translate(100 100)"
                />
            </svg>
            <svg
                className="absolute bottom-0 right-0 w-28 h-28 text-cyan-500/5 rotate-180"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M40,-60C55,-45,70,-30,76,-10C82,10,79,35,67,52C55,69,35,78,15,81C-5,84,-25,81,-45,71C-65,61,-85,45,-91,24C-97,3,-89,-22,-75,-41C-61,-60,-41,-73,-21,-78C-1,-83,19,-80,40,-60Z"
                    transform="translate(100 100)"
                />
            </svg>

            <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-cyan-400/10 rounded-full">
                        <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-base">{title}</h3>
                        <p className="text-sm text-foreground/70">{subtitle}</p>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ContactInfoCard;
