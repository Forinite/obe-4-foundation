//app/subcomponents/ContactComponents/FAQCard.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Edit, Trash } from 'lucide-react';

interface FAQCardProps {
    question: string;
    answer: string;
    index?: number;
    onEdit?: () => void;
    onDelete?: () => void;
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
            {/* Accent bar */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-500 to-blue-500 rounded-l-xl" />

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 leading-snug">
                        {question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed select-text">
                        {answer}
                    </p>
                </div>

                {/* Edit/Delete buttons */}
                {(onEdit || onDelete) && (
                    <div className="flex flex-col ml-4 gap-2">
                        {onEdit && (
                            <button
                                onClick={onEdit}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                title="Edit FAQ"
                            >
                                <Edit className="w-4 h-4 text-cyan-500" />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={onDelete}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                title="Delete FAQ"
                            >
                                <Trash className="w-4 h-4 text-red-500" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default FAQCard;
