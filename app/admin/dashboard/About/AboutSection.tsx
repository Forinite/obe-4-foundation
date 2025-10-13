// app/admin/dashboard/About/AboutSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, PlusCircle, Sparkles, RefreshCcw } from 'lucide-react';

import { useAboutData } from '@/app/hooks/useAboutData';
import ObjectiveCard from '@/app/(components)/adminComponents/About/ObjectiveCard';
import ApproachCard from '@/app/(components)/adminComponents/About/ApproachCard';
import ChallengeDataCard from '@/app/(components)/adminComponents/About/ChallengeDataCard';

export default function AboutSection() {
    const { data, loading, error, refetch } = useAboutData();

    // Placeholder button actions
    const handleEditChallengeData = () => console.log('Edit Challenge Data clicked');
    const handleAddObjective = () => console.log('Add Objective clicked');
    const handleAddApproach = () => console.log('Add Approach clicked');

    // 🌈 Display states
    if (loading)
        return (
            <div className="flex flex-col items-center w-full justify-center py-20 text-gray-500 dark:text-gray-400 animate-pulse">
                <Sparkles className="w-6 h-6 mb-3 text-cyan-500 animate-spin-slow" />
                <p className="text-base">Loading About Data...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-red-500 mb-3 font-medium">{error}</p>
                <button
                    onClick={refetch}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-red-500 to-rose-400 text-white hover:opacity-90 transition-all shadow-md"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Retry
                </button>
            </div>
        );

    if (!data)
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p>No About data found.</p>
            </div>
        );

    return (
        <section className="relative w-full space-y-12 pb-10">
            {/* Decorative gradient accent */}
            <div className="absolute top-0 right-0 w-1/3 h-48 bg-gradient-to-bl from-fuchsia-400/20 via-cyan-400/10 to-transparent blur-3xl pointer-events-none" />

            {/* 💡 Challenge Data */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_32px_-6px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-fuchsia-500 animate-pulse" />
                        <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Challenge Data
                        </h3>
                    </div>
                    <button
                        onClick={handleEditChallengeData}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white hover:opacity-90 transition-opacity duration-200 shadow-md"
                    >
                        <Pencil className="w-4 h-4" />
                        <span>Edit</span>
                    </button>
                </div>
                <ChallengeDataCard data={data.challengeData} />
            </motion.div>

            {/* 🎯 Objectives */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_32px_-6px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
                        <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Objectives
                        </h3>
                    </div>
                    <button
                        onClick={handleAddObjective}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-sky-400 text-white hover:opacity-90 transition-opacity duration-200 shadow-md"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Add Objective</span>
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data.objectives.map((objective, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ObjectiveCard objective={objective} index={index} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* 🧭 Approach */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_32px_-6px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                        <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Approach
                        </h3>
                    </div>
                    <button
                        onClick={handleAddApproach}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:opacity-90 transition-opacity duration-200 shadow-md"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Add Approach</span>
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data.approach.map((approach, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ApproachCard approach={approach} index={index} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
