// app/adminComponents/Home/MissionInfoCard.tsx

import { Trash2, Edit } from 'lucide-react';

interface MissionInfoCardProps {
    data: {
        percentage: number;
        text: string;
        list: string[];
    };
}

export default function MissionInfoCard({ data }: MissionInfoCardProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {data.percentage}% - {data.text}
                </h4>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400">
                        <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {data.list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}