// app/admin/dashboard/Admins/AdminManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Admin {
    _id: string;
    name: string;
    email: string;
}

export default function AdminManagement() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);

    // Fetch admins
    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        const res = await fetch('/api/admin/list');
        const data = await res.json();
        if (res.ok) setAdmins(data.admins);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const res = await fetch('/api/admin/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage({ type: 'success', text: 'Admin added successfully!' });
            setName('');
            setEmail('');
            setPassword('');
            fetchAdmins();
        } else {
            setMessage({ type: 'error', text: data.error || 'Failed to add admin.' });
        }
        setLoading(false);
    };

    const confirmDelete = (admin: Admin) => {
        setAdminToDelete(admin);
        setIsConfirmOpen(true);
    };

    const handleDelete = async () => {
        if (!adminToDelete) return;
        const res = await fetch(`/api/admin/delete?id=${adminToDelete._id}`, { method: 'DELETE' });

        if (res.ok) {
            setMessage({ type: 'success', text: 'Admin removed successfully!' });
            fetchAdmins();
        } else {
            setMessage({ type: 'error', text: 'Failed to remove admin.' });
        }

        setIsConfirmOpen(false);
        setAdminToDelete(null);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
            {/* Add Admin Form */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Admin</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Password input with show/hide toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Adding...' : 'Add Admin'}
                    </button>
                </form>
            </div>

            {/* Status Message */}
            {message && (
                <div
                    className={`p-3 rounded-lg text-sm ${
                        message.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {message.text}
                </div>
            )}

            {/* Admin List */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Current Admins ({admins.length})
                </h2>

                {admins.length === 0 ? (
                    <p className="text-gray-500">No admins yet.</p>
                ) : (
                    <div className="space-y-3">
                        {admins.map((admin) => (
                            <div
                                key={admin._id}
                                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{admin.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{admin.email}</p>
                                </div>
                                <button
                                    onClick={() => confirmDelete(admin)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Confirm Delete Modal */}
            {isConfirmOpen && adminToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to remove{' '}
                            <span className="font-semibold">{adminToDelete.name}</span>?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsConfirmOpen(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
