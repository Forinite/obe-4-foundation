//app/subcomponents/ContactComponents/FAQCard.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FAQCardProps {
    question: string;
    answer: string;
    className?: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer, className }) => {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className={cn(
                'relative overflow-hidden bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300',
                className
            )}
        >
            {/* Accent bar */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-500 to-blue-500 rounded-l-xl" />

            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 leading-snug">
                {question}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed select-text">
                {answer}
            </p>
        </motion.div>
    );
};

export default FAQCard;
