//app/(components)/adminComponents/Home/modals/UpdateVisionStatementModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/app/admin/components/Modal';
import { updateVisionStatement } from '@/app/actions/home';
// import { toast } from '@/lib/toast';

interface VisionStatement {
    title: string;
    mainStatement: string;
    highlight: string;
    goals: string[];
}

interface UpdateVisionStatementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    existingData?: VisionStatement | null;
}

export default function UpdateVisionStatementModal({
                                                       isOpen,
                                                       onClose,
                                                       onSuccess,
                                                       existingData,
                                                   }: UpdateVisionStatementModalProps) {
    const [title, setTitle] = useState('');
    const [mainStatement, setMainStatement] = useState('');
    const [highlight, setHighlight] = useState('');
    const [goals, setGoals] = useState<string[]>(['']);
    const [loading, setLoading] = useState(false);

    // 🟢 Prefill form if existing data is provided
    useEffect(() => {
        if (existingData) {
            setTitle(existingData.title || '');
            setMainStatement(existingData.mainStatement || '');
            setHighlight(existingData.highlight || '');
            setGoals(existingData.goals?.length ? existingData.goals : ['']);
        }
    }, [existingData]);

    const handleGoalChange = (index: number, value: string) => {
        const updated = [...goals];
        updated[index] = value;
        setGoals(updated);
    };

    const handleAddGoal = () => setGoals([...goals, '']);
    const handleRemoveGoal = (index: number) => setGoals(goals.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !mainStatement.trim() || !highlight.trim()) return;

        setLoading(true);
        try {
            await updateVisionStatement({
                title: title.trim(),
                mainStatement: mainStatement.trim(),
                highlight: highlight.trim(),
                goals: goals.filter((g) => g.trim() !== ''),
            });
            // toast.success('Vision statement updated successfully!');
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            // toast.error('Failed to update vision statement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Vision Statement">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Our Vision"
                        className="w-full p-3 border border-emerald-400/30 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={loading}
                    />
                </div>

                {/* Main Statement */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Main Statement
                    </label>
                    <textarea
                        value={mainStatement}
                        onChange={(e) => setMainStatement(e.target.value)}
                        placeholder="Write your main vision statement..."
                        rows={3}
                        className="w-full p-3 border border-emerald-400/30 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={loading}
                    />
                </div>

                {/* Highlight */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Highlight
                    </label>
                    <input
                        type="text"
                        value={highlight}
                        onChange={(e) => setHighlight(e.target.value)}
                        placeholder="e.g., Saving Lives Daily"
                        className="w-full p-3 border border-emerald-400/30 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={loading}
                    />
                </div>

                {/* Goals */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Goals
                    </label>
                    {goals.map((goal, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={goal}
                                onChange={(e) => handleGoalChange(i, e.target.value)}
                                placeholder={`Goal ${i + 1}`}
                                className="flex-1 p-3 border border-emerald-400/30 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                disabled={loading}
                            />
                            {goals.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveGoal(i)}
                                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                                    disabled={loading}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddGoal}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        disabled={loading}
                    >
                        + Add Goal
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Update Vision Statement'}
                </button>
            </form>
        </Modal>
    );
}
