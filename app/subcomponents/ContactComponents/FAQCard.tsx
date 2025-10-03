//app/subcomponents/ContactComponents/FAQCard.tsx

import { cn } from '@/lib/utils';

interface FAQCardProps {
    question: string;
    answer: string;
    className?: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer, className }) => {
    return (
        <div
            className={cn(
                'bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 cursor-default select-none',
                className,
            )}
        >
            <h3 className="font-semibold mb-3 text-cyan-400">{question}</h3>
            <p className="text-foreground/70 text-sm select-text cursor-text">{answer}</p>
        </div>
    );
};

export default FAQCard;