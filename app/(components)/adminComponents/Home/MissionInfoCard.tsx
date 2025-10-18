// app/adminComponents/Home/MissionInfoCard.tsx
'use client';

import React from 'react';  // 🔥 NO useState!
import { motion } from 'framer-motion';
import { Trash2, Edit3, ChevronRight, Target } from 'lucide-react';

interface MissionInfoCardProps {
    data: {
        percentage: number;
        text: string;
        list: string[];
    };
    onEdit: () => void;
    onDelete: () => void;  // 🔥 CALLBACK
    onRefetch: () => void;
}

export default function MissionInfoCard({ data, onEdit, onDelete, onRefetch }: MissionInfoCardProps) {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (data.percentage / 100) * circumference;

    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200/40 dark:border-gray-700/40 shadow-md hover:shadow-cyan-500/10 transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-5">
                    <div className="relative flex items-center justify-center w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90">
                            <circle cx="40" cy="40" r={radius} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="6" fill="transparent" />
                            <circle cx="40" cy="40" r={radius} stroke="url(#progressGradient)" strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
                            <defs>
                                <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {data.percentage}%
                        </span>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-wide">
                            {data.text}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mission Objective Overview</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-cyan-600/20 text-cyan-500 hover:text-cyan-300 transition-colors"
                    >
                        <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onDelete}  // 🔥 CALLBACK TO HOMESECTION
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-600/20 text-red-500 hover:text-red-300 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <ul className="space-y-2 mt-4">
                {data.list.map((item, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100/70 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/40 rounded-lg px-4 py-2 transition-all duration-200">
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                            <span className="text-cyan-500"><Target className="w-4 h-4" /></span>
                            <span className="text-sm font-medium">{item}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </li>
                ))}
            </ul>
        </motion.div>
        // 🔥 NO MODALS HERE!
    );
}