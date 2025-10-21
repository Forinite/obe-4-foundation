//app/(components)/adminComponents/Home/modals/AddMissionStatementModal.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addMissionStatement } from '@/app/actions/home';
import Modal from '@/app/admin/components/Modal';
import { Plus, CheckCircle2 } from 'lucide-react';

export default function AddMissionStatementModal({
                                                     isOpen,
                                                     onClose,
                                                     onSuccess,
                                                 }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [statement, setStatement] = useState('');
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxWords = 80;

    // 🧠 Focus textarea when modal opens
    useEffect(() => {
        if (isOpen) {
            setStatement('');
            setAdded(false);
            setTimeout(() => textareaRef.current?.focus(), 200);
        }
    }, [isOpen]);

    // ✨ Auto-resize textarea as user types
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
            await addMissionStatement(statement.trim());
            setAdded(true);
            onSuccess();

            // Show confirmation briefly
            setTimeout(() => {
                setAdded(false);
                onClose();
            }, 900);
        } catch (error) {
            console.error('Failed to add mission statement:', error);
        } finally {
            setLoading(false);
        }
    };

    const wordCount = statement.trim().split(/\s+/).filter(Boolean).length;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Mission Statement">
            <form onSubmit={handleSubmit} className="space-y-4 relative">
        <textarea
            ref={textareaRef}
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Enter mission statement..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-200"
            rows={3}
            disabled={loading}
            maxLength={600}
        />

                {/* Word counter */}
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
                    {added ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                            Added!
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4" />
                            {loading ? 'Adding...' : 'Add Statement'}
                        </>
                    )}
                </button>

                {/* Quick success feedback */}
                <AnimatePresence>
                    {added && (
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
            </form>
        </Modal>
    );
}
