// app/adminComponents/Home/ServiceCard.tsx
'use client';

import React from 'react';  // 🔥 NO useState!
import { Service } from '@/app/types';
import { renderIcon } from '@/lib/icons';
import { Trash2, Edit } from 'lucide-react';

interface ServiceCardProps {
    service: Service;
    index: number;
    onEdit: () => void;
    onDelete: () => void;  // 🔥 CALLBACK
    onRefetch: () => void;
}

export default function ServiceCard({ service, index, onEdit, onDelete, onRefetch }: ServiceCardProps) {
    return (
        <div className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-cyan-500/20 transition-all duration-300 ease-out transform hover:-translate-y-1 p-6">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />

            <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:shadow-cyan-400/30 transition-all duration-300">
                        <div className="w-6 h-6">{renderIcon(service.icon)}</div>
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                        {service.title}
                    </h4>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onEdit}
                        className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 hover:scale-110"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onDelete}  // 🔥 CALLBACK TO HOMESECTION
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:scale-110"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
            </p>
        </div>
        // 🔥 NO MODALS HERE!
    );
}