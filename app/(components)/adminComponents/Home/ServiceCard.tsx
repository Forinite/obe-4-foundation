// app/adminComponents/Home/ServiceCard.tsx

import { Service } from '@/app/types';
// import { renderIcon } from '@/lib/icons';
import { Trash2, Edit } from 'lucide-react';

interface ServiceCardProps {
    service: Service;
    index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {/*{renderIcon(service.icon)}*/}
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{service.title}</h4>
                </div>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400">
                        <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
        </div>
    );
}