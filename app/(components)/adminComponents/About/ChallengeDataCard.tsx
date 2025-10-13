// app/adminComponents/About/ChallengeDataCard.tsx

import { renderIcon } from '@/lib/icons';
import { Trash2, Edit } from 'lucide-react';

interface ChallengeDataCardProps {
    data: {
        statistic: string;
        description: string;
        subDescription: string;
        items: { icon: string; text: string }[];
    };
}

export default function ChallengeDataCard({ data }: ChallengeDataCardProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{data.statistic}</h4>
                <div className="flex gap-3">
                    <button
                        className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label="Edit challenge data"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label="Delete challenge data"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{data.description}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{data.subDescription}</p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {data.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {renderIcon(item.icon)}
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}