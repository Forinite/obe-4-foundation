//app/subcomponents/DonationComponents/ImpactCard.tsx


import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImpactCardProps {
    icon: LucideIcon;
    value: string;
    label: string;
    className?: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({
                                                   icon: Icon,
                                                   value,
                                                   label,
                                                   className,
                                               }) => {
    return (
        <div
            className={cn(
                'bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 text-center',
                className,
            )}
        >
            <div className="text-cyan-400 flex justify-center  mb-2">
                <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="text-xl font-bold text-foreground mb-1">{value}</div>
            <div className="text-sm text-foreground/70">{label}</div>
        </div>
    );
};

export default ImpactCard;