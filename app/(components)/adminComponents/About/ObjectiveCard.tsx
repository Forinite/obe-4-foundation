// app/(components)/adminComponents/About/ObjectiveCard.tsx
'use client';

import React from 'react';
import { Objective } from '@/app/types';
import { renderIcon } from '@/lib/icons';
import { Trash2, PencilLine } from 'lucide-react';
import { motion } from 'framer-motion';

interface ObjectiveCardProps {
    objective: Objective;
    index: number;
    onEdit: () => void;  // 🔥 CALLBACK
    onDelete: () => void;  // 🔥 CALLBACK
    onRefetch: () => void;
}

export default function ObjectiveCard({ objective, index, onEdit, onDelete, onRefetch }: ObjectiveCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_28px_-6px_rgba(0,0,0,0.15)] transition-all duration-300 p-6"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/5 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center min-w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 text-fuchsia-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                        {renderIcon(objective.icon)}
                    </div>
                    <h4 className="md:text-lg text-base font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
                        {objective.title}
                    </h4>
                </div>
                <div className="flex md:relative md:top-0 -top-4 right-0 absolute gap-3 text-neutral-500 dark:text-neutral-400">
                    <button
                        onClick={onEdit}  // 🔥 CALLBACK
                        aria-label={`Edit objective ${objective.title}`}
                        className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200"
                    >
                        <PencilLine className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onDelete}  // 🔥 CALLBACK
                        aria-label={`Delete objective ${objective.title}`}
                        className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <ul className="relative z-10 md:text-base text-sm list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {objective.items.map((item, i) => (
                    <li
                        key={i}
                        className="transition-all duration-200 hover:text-neutral-900 dark:hover:text-white"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
