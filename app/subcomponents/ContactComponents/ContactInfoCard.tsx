//app/subcomponents/ContactComponents/ContactInfoCard.tsx

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
                'bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 cursor-default select-none',
                className,
            )}
        >
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-cyan-400/10 rounded-full">
                    <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-foreground/70">{subtitle}</p>
                </div>
            </div>
            {children}
        </div>
    );
};

export default ContactInfoCard;