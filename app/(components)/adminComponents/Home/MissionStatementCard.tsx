// app/adminComponents/Home/MissionStatementCard.tsx

import { Trash2, Edit } from 'lucide-react';

interface MissionStatementCardProps {
    statement: string;
    index: number;
}

export default function MissionStatementCard({ statement, index }: MissionStatementCardProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-700 dark:text-gray-300">{statement}</p>
            <div className="flex gap-2">
                <button className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400">
                    <Edit className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}