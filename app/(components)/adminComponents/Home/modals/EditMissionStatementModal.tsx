//app/(components)/adminComponents/Home/modals/EditMissionStatementModal.tsx


'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateMissionStatement } from '@/app/actions/home';
import Modal from '@/app/admin/components/Modal';
import { Edit, CheckCircle2 } from 'lucide-react';

export default function EditMissionStatementModal({
                                                      isOpen,
                                                      onClose,
                                                      index,
                                                      initialStatement,
                                                      onSuccess,
                                                  }: {
    isOpen: boolean;
    onClose: () => void;
    index: number;
    initialStatement: string;
    onSuccess: () => void;
}) {
    const [statement, setStatement] = useState('');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxWords = 80;

    // 🧠 Sync input when modal opens
    useEffect(() => {
        if (isOpen) {
            setStatement(initialStatement || '');
            setSaved(false);
            setTimeout(() => textareaRef.current?.focus(), 200);
        }
    }, [isOpen, initialStatement]);

    // ✨ Auto-resize textarea height as user types
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [statement]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!statement.trim()) return;

        setLoading(true);
        try {
            await updateMissionStatement(index, statement.trim());
            setSaved(true);
            onSuccess();

            // brief feedback before closing
            setTimeout(() => {
                setSaved(false);
                onClose();
            }, 900);
        } catch (error) {
            console.error('Failed to update mission statement:', error);
        } finally {
            setLoading(false);
        }
    };

    const wordCount = statement.trim().split(/\s+/).filter(Boolean).length;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Mission Statement">
            <form onSubmit={handleSubmit} className="space-y-4 relative">
        <textarea
            ref={textareaRef}
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-200"
            rows={3}
            disabled={loading}
            placeholder="Enter mission statement..."
            maxLength={600}
        />

                {/* Word count hint */}
                <p
                    className={`text-xs text-right ${
                        wordCount > maxWords ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
                    }`}
                >
                    {wordCount}/{maxWords} words
                </p>

                <button
                    type="submit"
                    disabled={!statement.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-200"
                >
                    {saved ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Edit className="w-4 h-4" />
                            {loading ? 'Saving...' : 'Update Statement'}
                        </>
                    )}
                </button>
            </form>

            {/* Smooth “saved” fade animation */}
            <AnimatePresence>
                {saved && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/70 rounded-lg"
                    >
                        <CheckCircle2 className="w-8 h-8 text-cyan-600 animate-bounce" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    );
}
