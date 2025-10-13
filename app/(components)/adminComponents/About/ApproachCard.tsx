// app/adminComponents/About/ApproachCard.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { renderIcon } from '@/lib/icons';
import { Approach } from '@/app/types';

interface ApproachCardProps {
    approach: Approach;
    index: number;
}

export default function ApproachCard({ approach, index }: ApproachCardProps) {
    const handleEdit = () => {
        console.log(`Edit clicked for ${approach.title}`);
    };

    const handleDelete = () => {
        console.log(`Delete clicked for ${approach.title}`);
    };

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-800 border border-gray-700/40 shadow-md hover:shadow-cyan-500/10 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20 group-hover:ring-cyan-500/30 transition-all">
                        {renderIcon(approach.icon)}
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white">{approach.title}</h4>
                        <p className="text-xs text-gray-400">#{index + 1} Approach</p>
                    </div>
                </div>

                <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEdit}
                        className="p-2 rounded-lg bg-gray-800/70 hover:bg-cyan-600/20 text-cyan-400 hover:text-cyan-300 transition-colors"
                        aria-label={`Edit approach ${approach.title}`}
                    >
                        <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg bg-gray-800/70 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                        aria-label={`Delete approach ${approach.title}`}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
                {approach.description}
            </p>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/20 pointer-events-none transition-all duration-300" />
        </motion.div>
    );
}
