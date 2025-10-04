//app/subcomponents/DonationComponents/DonationHeader.tsx

import { cn } from '@/lib/utils';
import { donationHeader } from '@/app/constants/donationData';

interface DonationHeaderProps {
    className?: string;
}

const DonationHeader: React.FC<DonationHeaderProps> = ({ className }) => {
    return (
        <div className={cn('text-center mb-16 relative z-10', className)}>
            <div className="relative">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    {donationHeader.title}
                </h1>
                <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                    {donationHeader.description}
                </p>
                <div className="absolute inset-0 -z-10 bg-cyan-400/10 blur-3xl rounded-full scale-150" />
            </div>
        </div>
    );
};

export default DonationHeader;