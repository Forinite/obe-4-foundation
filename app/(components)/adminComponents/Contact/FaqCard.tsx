// app/adminComponents/Contact/FaqCard.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Edit2, Trash2 } from 'lucide-react';

interface FAQCardProps {
    question: string;
    answer: string;
    index: number;
    onEdit: () => void;  // 🔥 CALLBACK
    onDelete: () => void;  // 🔥 CALLBACK
    onRefetch: () => void;
    className?: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer, onEdit, onDelete, className }) => {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className={cn(
                'relative overflow-hidden bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300',
                className
            )}
        >
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-500 to-blue-500 rounded-l-xl" />

            <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 leading-snug flex-1">
                    {question}
                </h3>
                <div className="flex gap-2 ml-3">
                    <button onClick={onEdit} className="text-gray-500 hover:text-cyan-600 p-1 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} className="text-gray-500 hover:text-red-600 p-1 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed select-text">
                {answer}
            </p>
        </motion.div>
    );
};

export default FAQCard;