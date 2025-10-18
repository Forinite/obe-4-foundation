//app/(components)/adminComponents/Home/modals/EditMissionStatementModal.tsx
'use client';

import React, { useState, useEffect } from 'react';  // 🔥 ADD useEffect!
import { updateMissionStatement } from '@/app/actions/home';
import Modal from '@/app/admin/components/Modal';
import { Edit } from 'lucide-react';

export default function EditMissionStatementModal({
                                                      isOpen,
                                                      onClose,
                                                      index,
                                                      initialStatement,
                                                      onSuccess
                                                  }: {
    isOpen: boolean;
    onClose: () => void;
    index: number;
    initialStatement: string;
    onSuccess: () => void;
}) {
    const [statement, setStatement] = useState('');  // 🔥 START EMPTY
    const [loading, setLoading] = useState(false);

    // 🔥 FIX: UPDATE WHEN DATA ARRIVES!
    useEffect(() => {
        if (isOpen) {
            setStatement(initialStatement || '');  // 🔥 SYNC WITH PROP!
            console.log('🔥 MODAL SET:', initialStatement);  // 🔥 DEBUG
        }
    }, [isOpen, initialStatement]);  // 🔥 RUN ON OPEN + DATA CHANGE

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!statement.trim()) return;

        setLoading(true);
        try {
            await updateMissionStatement(index, statement.trim());
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to update mission statement:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Mission Statement">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows={3}
                    disabled={loading}
                    placeholder="Enter mission statement..."
                />
                <button
                    type="submit"
                    disabled={!statement.trim() || loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Update Statement'}
                </button>
            </form>
        </Modal>
    );
}