// app/admin/dashboard/About/AboutSection.tsx

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, PlusCircle, Sparkles, RefreshCcw } from 'lucide-react';

import { useAboutData } from '@/app/hooks/useAboutData';
import ObjectiveCard from '@/app/(components)/adminComponents/About/ObjectiveCard';
import ApproachCard from '@/app/(components)/adminComponents/About/ApproachCard';
import ChallengeDataCard from '@/app/(components)/adminComponents/About/ChallengeDataCard';
import AddObjectiveModal from '@/app/(components)/adminComponents/About/modal/AddObjectiveModal';
import AddApproachModal from '@/app/(components)/adminComponents/About/modal/AddApproachModal';
import EditChallengeDataModal from '@/app/(components)/adminComponents/About/modal/EditChallengeDataModal';
import EditObjectiveModal from '@/app/(components)/adminComponents/About/modal/EditObjectiveModal';
import EditApproachModal from '@/app/(components)/adminComponents/About/modal/EditApproachModal';
import {
    addObjective, deleteObjective,
    addApproach, deleteApproach,
    updateChallengeData
} from '@/app/actions/about';
// import AddObjectiveModal from "@/app/(components)/adminComponents/About/modal/AddObjectiveModal";

export default function AboutSection() {
    const { data, loading, error, refetch } = useAboutData();

    // 🔥 ADD MODALS
    const [showAddObjectiveModal, setShowAddObjectiveModal] = useState(false);
    const [showAddApproachModal, setShowAddApproachModal] = useState(false);

    // 🔥 EDIT MODALS
    const [showEditChallengeDataModal, setShowEditChallengeDataModal] = useState(false);
    const [editChallengeData, setEditChallengeData] = useState<any>({});

    const [showEditObjectiveModal, setShowEditObjectiveModal] = useState(false);
    const [editObjectiveIndex, setEditObjectiveIndex] = useState(-1);
    const [editObjectiveData, setEditObjectiveData] = useState({ icon: '', title: '', items: [] });

    const [showEditApproachModal, setShowEditApproachModal] = useState(false);
    const [editApproachIndex, setEditApproachIndex] = useState(-1);
    const [editApproachData, setEditApproachData] = useState({ icon: '', title: '', description: '' });

    // 🔥 DELETE MODALS
    const [showDeleteObjectiveModal, setShowDeleteObjectiveModal] = useState(false);
    const [deleteObjectiveIndex, setDeleteObjectiveIndex] = useState(-1);

    const [showDeleteApproachModal, setShowDeleteApproachModal] = useState(false);
    const [deleteApproachIndex, setDeleteApproachIndex] = useState(-1);

    const [showDeleteChallengeDataModal, setShowDeleteChallengeDataModal] = useState(false);

    const handleSuccess = () => {
        refetch();
    };

    // 🔥 ADD CALLBACKS
    const openAddObjective = () => setShowAddObjectiveModal(true);
    const openAddApproach = () => setShowAddApproachModal(true);

    // 🔥 EDIT CALLBACKS
    const openEditChallengeData = () => {
        setEditChallengeData(data?.challengeData);
        setShowEditChallengeDataModal(true);
    };

    const openEditObjective = (index: number, objective: any) => {
        setEditObjectiveIndex(index);
        setEditObjectiveData(objective);
        setShowEditObjectiveModal(true);
    };

    const openEditApproach = (index: number, approach: any) => {
        setEditApproachIndex(index);
        setEditApproachData(approach);
        setShowEditApproachModal(true);
    };

    // 🔥 DELETE CALLBACKS
    const openDeleteObjective = (index: number) => {
        setDeleteObjectiveIndex(index);
        setShowDeleteObjectiveModal(true);
    };

    const openDeleteApproach = (index: number) => {
        setDeleteApproachIndex(index);
        setShowDeleteApproachModal(true);
    };

    const openDeleteChallengeData = () => {
        setShowDeleteChallengeDataModal(true);
    };

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
        <>
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
                            <h3 className="text-lg md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                Challenge Data
                            </h3>
                        </div>
                        <button
                            onClick={openEditChallengeData}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white hover:opacity-90 transition-opacity duration-200 shadow-md"
                        >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    </div>
                    <ChallengeDataCard
                        data={data.challengeData}
                        onEdit={openEditChallengeData}
                        onDelete={openDeleteChallengeData}
                        onRefetch={handleSuccess}
                    />
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
                            <h3 className="text-lg md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                Objectives
                            </h3>
                        </div>
                        <button
                            onClick={openAddObjective}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-sky-400 text-white hover:opacity-90 transition-opacity duration-200 shadow-md"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Add</span>
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
                                <ObjectiveCard
                                    objective={objective}
                                    index={index}
                                    onEdit={() => openEditObjective(index, objective)}
                                    onDelete={() => openDeleteObjective(index)}
                                    onRefetch={handleSuccess}
                                />
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
                            <h3 className="text-lg md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                Approach
                            </h3>
                        </div>
                        <button
                            onClick={openAddApproach}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:opacity-90 transition-opacity duration-200 shadow-md"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Add </span>
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
                                <ApproachCard
                                    approach={approach}
                                    index={index}
                                    onEdit={() => openEditApproach(index, approach)}
                                    onDelete={() => openDeleteApproach(index)}
                                    onRefetch={handleSuccess}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* 🔥 ALL 9 MODALS RENDER HERE = PERFECT POSITIONING! */}

            {/* ADD MODALS */}
            <AddObjectiveModal
                isOpen={showAddObjectiveModal}
                onClose={() => setShowAddObjectiveModal(false)}
                onSuccess={handleSuccess}
            />
            <AddApproachModal
                isOpen={showAddApproachModal}
                onClose={() => setShowAddApproachModal(false)}
                onSuccess={handleSuccess}
            />

            {/* EDIT MODALS */}
            <EditChallengeDataModal
                isOpen={showEditChallengeDataModal}
                onClose={() => setShowEditChallengeDataModal(false)}
                initialData={editChallengeData}
                onSuccess={handleSuccess}
            />
            <EditObjectiveModal
                isOpen={showEditObjectiveModal}
                onClose={() => setShowEditObjectiveModal(false)}
                index={editObjectiveIndex}
                initialObjective={editObjectiveData}
                onSuccess={handleSuccess}
            />
            <EditApproachModal
                isOpen={showEditApproachModal}
                onClose={() => setShowEditApproachModal(false)}
                index={editApproachIndex}
                initialApproach={editApproachData}
                onSuccess={handleSuccess}
            />

            {/* 🔥 DELETE MODALS */}
            {showDeleteObjectiveModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Objective?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    await deleteObjective(deleteObjectiveIndex);
                                    handleSuccess();
                                    setShowDeleteObjectiveModal(false);
                                }}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteObjectiveModal(false)}
                                className="flex-1 bg-gray-300 dark:bg-gray-600 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteApproachModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Approach?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    await deleteApproach(deleteApproachIndex);
                                    handleSuccess();
                                    setShowDeleteApproachModal(false);
                                }}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteApproachModal(false)}
                                className="flex-1 bg-gray-300 dark:bg-gray-600 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteChallengeDataModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Challenge Data?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    const emptyData = { statistic: '', description: '', subDescription: '', items: [] };
                                    await updateChallengeData(emptyData);
                                    handleSuccess();
                                    setShowDeleteChallengeDataModal(false);
                                }}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteChallengeDataModal(false)}
                                className="flex-1 bg-gray-300 dark:bg-gray-600 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}