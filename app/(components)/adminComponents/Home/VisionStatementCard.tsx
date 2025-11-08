//app/(components)/adminComponents/Home/VisionStatementCard.tsx

'use client';

import React from 'react';
import {Info, Eye, PencilLine} from 'lucide-react';

export interface VisionStatement {
    title?: string;
    mainStatement?: string;
    highlight?: string;
    goals?: string[];
}


interface VisionStatementCardProps {
    data?: VisionStatement;
    onEdit: () => void;
}

export default function VisionStatementCard({ data, onEdit }: VisionStatementCardProps) {
    return (
        <section className="relative overflow-hidden p-8 rounded-2xl border border-emerald-500/10 bg-white/80 dark:bg-gray-900/60 backdrop-blur-md shadow-md hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-500">
            {/* Subtle gradient aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/10 via-transparent to-cyan-400/10 blur-3xl pointer-events-none" />

            {/* Glow orb */}
            <div className="absolute top-6 right-8 w-16 h-16 bg-emerald-400/20 rounded-full blur-2xl animate-pulse pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-emerald-400/10 text-emerald-500">
                        <Eye className="md:w-5 md:h-5 w-4 h-4" />
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                        Vision Statement
                    </h3>
                </div>

                <button
                    onClick={onEdit}
                    className="relative flex items-center gap-2 ml-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 px-4 py-2 rounded-lg border border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-300"
                >
                    Edit
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {data ? (
                    <>
                        <h4 className="text-xl font-semibold text-cyan-500 mb-4">{data.title}</h4>

                        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-[15px]">
                            {data.mainStatement}
                        </p>

                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                            <span className="text-sm font-medium text-neutral-600">{data.highlight}</span>
                        </div>

                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2 text-sm">
                            {data.goals?.map((goal, i) => (
                                <li key={i} className="hover:text-emerald-500 transition-colors duration-200">
                                    {goal}
                                </li>
                            ))}
                        </ul>

                        {/* Accent underline */}
                        <div className="mt-6 w-24 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full" />
                    </>
                ) : (
                    <p className="text-gray-500 italic flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-400" />
                        No vision statement set.
                    </p>
                )}
            </div>
        </section>
    );
}
