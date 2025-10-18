//app/(components)/adminComponents/Home/modals/AddMissionStatementModal.tsx
'use client';

import { useState } from 'react';
import { addMissionStatement } from '@/app/actions/home';  // ← Server Action!
import Modal from '@/app/admin/components/Modal';
// import { Plus } from 'lucide-react';

export default function AddMissionStatementModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void; }) {
    const [statement, setStatement] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!statement.trim()) return;

        setLoading(true);
        try {
            await addMissionStatement(statement.trim());  // ← MAGIC: Runs on SERVER!
            onSuccess();
            setStatement('');
            onClose();
        } catch (error) {
            console.error('Failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Mission Statement">
            <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Enter mission statement..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500"
            rows={3}
            disabled={loading}
        />
                <button type="submit" disabled={!statement.trim() || loading} className="w-full bg-cyan-600 text-white py-2 rounded-lg disabled:opacity-50">
                    {loading ? 'Adding...' : 'Add Statement'}
                </button>
            </form>
        </Modal>
    );
}