// app/adminComponents/About/ObjectiveCard.tsx

import { Objective } from '@/types';
import { renderIcon } from '@/lib/icons';
import { Trash2, Edit } from 'lucide-react';

interface ObjectiveCardProps {
    objective: Objective;
    index: number;
}

export default function ObjectiveCard({ objective, index }: ObjectiveCardProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {renderIcon(objective.icon)}
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{objective.title}</h4>
                </div>
                <div className="flex gap-3">
                    <button
                        className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label={`Edit objective ${objective.title}`}
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label={`Delete objective ${objective.title}`}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {objective.items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}