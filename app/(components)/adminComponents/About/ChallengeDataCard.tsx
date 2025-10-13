// app/adminComponents/About/ChallengeDataCard.tsx

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, ChevronRight } from 'lucide-react';
import { renderIcon } from '@/lib/icons';

interface ChallengeDataCardProps {
    data: {
        statistic: string;
        description: string;
        subDescription: string;
        items: { icon: string; text: string }[];
    };
}

export default function ChallengeDataCard({ data }: ChallengeDataCardProps) {
    const handleEdit = () => {
        console.log('Edit challenge data clicked');
    };

    const handleDelete = () => {
        console.log('Delete challenge data clicked');
    };

    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="group relative p-6 bg-gradient-to-br from-gray-900/90 to-gray-800 rounded-2xl border border-gray-700/40 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h4 className="text-xl font-semibold text-white mb-1 tracking-wide">
                        {data.statistic}
                    </h4>
                    <p className="text-sm text-gray-400">Challenge Statistic</p>
                </div>

                <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEdit}
                        className="p-2 rounded-lg bg-gray-800/70 hover:bg-cyan-600/20 text-cyan-400 hover:text-cyan-300 transition-colors"
                        aria-label="Edit challenge data"
                    >
                        <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg bg-gray-800/70 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete challenge data"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <p className="text-gray-300 mb-2 leading-relaxed">{data.description}</p>
            <p className="text-gray-400 mb-5">{data.subDescription}</p>

            {/* Items */}
            <ul className="space-y-2">
                {data.items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between bg-gray-800/50 hover:bg-gray-700/40 rounded-lg px-3 py-2 transition-all duration-200"
                    >
                        <div className="flex items-center gap-3 text-gray-200">
                            <span className="text-cyan-400">{renderIcon(item.icon)}</span>
                            <span className="text-sm font-medium">{item.text}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </li>
                ))}
            </ul>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/20 pointer-events-none transition-all duration-300" />
        </motion.div>
    );
}
