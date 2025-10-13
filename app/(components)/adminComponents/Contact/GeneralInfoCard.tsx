// app/adminComponents/Contact/GeneralInfoCard.tsx

import { Trash2, Edit } from 'lucide-react';

interface GeneralInfoCardProps {
    data: {
        address1: string;
        address2: string;
        phone1: string;
        phone2: string;
        email: string;
        twitter: string;
        linkedin: string;
        openDays: { day: string; time: string }[];
        charity: string;
    };
}

export default function GeneralInfoCard({ data }: GeneralInfoCardProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">General Information</h4>
                <div className="flex gap-3">
                    <button
                        className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label="Edit general info"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label="Delete general info"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> {data.address1}, {data.address2}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {data.phone1}, {data.phone2}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {data.email}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Twitter:</strong> {data.twitter}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>LinkedIn:</strong> {data.linkedin}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Charity:</strong> {data.charity}</p>
            <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mt-4">Open Days</h5>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {data.openDays.map((day, index) => (
                    <li key={index}>{day.day}: {day.time}</li>
                ))}
            </ul>
        </div>
    );
}