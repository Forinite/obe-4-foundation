// app/adminComponents/Contact/FaqCard.tsx

import { Trash2, Edit } from 'lucide-react';

interface FaqCardProps {
    faq: { question: string; answer: string };
    index: number;
}

export default function FaqCard({ faq, index }: FaqCardProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{faq.question}</h4>
                <div className="flex gap-3">
                    <button
                        className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label={`Edit FAQ ${faq.question}`}
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label={`Delete FAQ ${faq.question}`}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
        </div>
    );
}