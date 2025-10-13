// app/adminComponents/About/ApproachCard.tsx

import { Approach } from '@/app/types';
import { renderIcon } from '@/lib/icons';
import { Trash2, Edit } from 'lucide-react';

interface ApproachCardProps {
    approach: Approach;
    index: number;
}

export default function ApproachCard({ approach, index }: ApproachCardProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {renderIcon(approach.icon)}
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{approach.title}</h4>
                </div>
                <div className="flex gap-3">
                    <button
                        className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label={`Edit approach ${approach.title}`}
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label={`Delete approach ${approach.title}`}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{approach.description}</p>
        </div>
    );
}