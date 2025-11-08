//app/subcomponents/DonationComponents/DonationMethodCard.tsx
import { cn } from '@/lib/utils';
import CopyButton from './CopyButton';
import React from 'react';

interface DonationMethodCardProps {
    title: string;
    subtitle: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // ✅ typed as Lucide-style SVG component
    gradient: string;
    details: { label: string; value: string }[];
    className?: string;
}

const DonationMethodCard: React.FC<DonationMethodCardProps> = ({
                                                                   title,
                                                                   subtitle,
                                                                   icon: Icon,
                                                                   gradient,
                                                                   details,
                                                                   className,
                                                               }) => {
    return (
        <div
            className={cn(
                `relative bg-gradient-to-br ${gradient}/10 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300`,
                className,
            )}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                        {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                        <p className="text-sm text-foreground/70">{subtitle}</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {details.map((detail, index) => (
                    <div
                        key={index}
                        className="bg-background/50 rounded-lg p-4 border border-neutral-300"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground/80 mb-1">{detail.label}</p>
                                <p className="text-foreground font-mono text-sm select-text cursor-text break-all">
                                    {detail.value}
                                </p>
                            </div>
                            <CopyButton text={detail.value} label={detail.label} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border/30">
                <div className="flex items-center justify-center space-x-2 text-xs text-foreground/60">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Secure & Verified Account</span>
                </div>
            </div>
        </div>
    );
};

export default DonationMethodCard;
