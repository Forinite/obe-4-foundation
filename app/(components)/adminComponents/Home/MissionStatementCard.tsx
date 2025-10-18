// app/adminComponents/Home/MissionStatementCard.tsx
'use client';

import React from 'react';  // 🔥 NO useState!
import { Edit3, Trash2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MissionStatementCardProps {
    statement: string;
    index: number;
    onEdit: () => void;
    onDelete: () => void;  // 🔥 CALLBACK
    onRefetch: () => void;
}

export default function MissionStatementCard({ statement, index, onEdit, onDelete, onRefetch }: MissionStatementCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex items-start justify-between gap-4 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.12)] transition-all duration-300"
        >
            <div className="absolute -left-2 -top-2 p-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-4 h-4 animate-pulse-soft" />
            </div>

            <p className="flex-1 text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                {statement}
            </p>

            <div className="flex items-center gap-3 ml-4 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={onEdit}
                    className="p-2 rounded-lg text-neutral-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-cyan-500/10 transition-colors duration-200"
                >
                    <Edit3 className="w-5 h-5" />
                </button>
                <button
                    onClick={onDelete}  // 🔥 CALLBACK TO HOMESECTION
                    className="p-2 rounded-lg text-neutral-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/10 transition-colors duration-200"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
        // 🔥 NO MODALS HERE!
    );
}