//app/(components)/adminComponents/Contact/GeneralInfoCard.tsx

'use client';

import React from 'react';
import {
    Edit,
    Trash2,
    Phone,
    Mail,
    Twitter,
    Linkedin,
    HeartHandshake,
    CalendarDays,
    Facebook,
    Instagram
} from 'lucide-react';

interface GeneralInfoCardProps {
    data: {
        address1: string;
        address2: string;
        phone1: string;
        phone2: string;
        email: string;
        twitter: string;
        linkedin: string;
        facebook: string;
        instagram: string;
        openDays: { day: string; time: string }[];
        charity: string;
    };
    onEdit: () => void;  // 🔥 CALLBACK
    onRefetch: () => void;
}

export default function GeneralInfoCard({ data, onEdit }: GeneralInfoCardProps) {
    const infoCards = [
        { icon: <Phone className="w-6 h-6" />, label: 'Phone1', value: data.phone1 || undefined, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
        { icon: <Phone className="w-6 h-6" />, label: 'Phone2', value: data.phone2 || undefined, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
        { icon: <Mail className="w-6 h-6" />, label: 'Email', value: data.email || undefined, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
        { icon: <Twitter className="w-6 h-6" />, label: 'Twitter', value: data.twitter || undefined, color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
        { icon: <Linkedin className="w-6 h-6" />, label: 'LinkedIn', value: data.linkedin || undefined, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
        { icon: <Facebook className="w-6 h-6" />, label: 'Facebook', value: data.facebook || undefined, color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
        { icon: <Instagram className="w-6 h-6" />, label: 'Instagram', value: data.instagram || undefined, color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
        { icon: <HeartHandshake className="w-6 h-6" />, label: 'Charity', value: data.charity || undefined, color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
    ].filter(Boolean); // Remove undefined
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-5">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">General Information</h4>
                <div className="flex gap-3">
                    <button onClick={onEdit} className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        <Edit className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Addresses</h5>
                <div className="space-y-2 pl-2 text-gray-700 dark:text-gray-300 md:text-base text-xs border-l-4 border-cyan-400/60 dark:border-cyan-500/50">
                    <p>{data.address1}</p>
                    <p>{data.address2}</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {infoCards.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40 hover:border-cyan-400/50 hover:shadow-lg transition-all duration-300 group">
                        <div className={`w-full flex items-center justify-center py-4 ${item.color} transition-all duration-300 group-hover:scale-105`}>{item.icon}</div>
                        <div className="w-full px-3 py-3 text-center">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{item.label}</p>
                            <p className="text-gray-800 dark:text-gray-100 text-[15px] font-medium truncate">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                    <CalendarDays className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-wide">Open Days</h5>
                </div>
                <ul className="flex flex-wrap gap-4">
                    {data.openDays.map((day, index) => (
                        <li key={index} className="relative group flex flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/60 dark:to-gray-800/80 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                            <span className="font-semibold text-gray-800 dark:text-gray-100">{day.day}</span>
                            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className={'md:text-sm text-xs'}>{day.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
