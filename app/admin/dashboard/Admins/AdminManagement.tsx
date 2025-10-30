// app/admin/dashboard/Admins/AdminManagement.tsx
'use client';

import { useState, useEffect } from 'react';

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
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Load admins
    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        const res = await fetch('/api/admin/list');
        const data = await res.json();
        if (res.ok) {
            setAdmins(data.admins);
        }
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
            setMessage({ type: 'success', text: 'Admin added!' });
            setName('');
            setEmail('');
            setPassword('');
            fetchAdmins();
        } else {
            setMessage({ type: 'error', text: data.error || 'Failed' });
        }
        setLoading(false);
    };

    const handleRemove = async (id: string) => {
        if (!confirm('Remove this admin?')) return;

        const res = await fetch(`/api/admin/delete?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            setMessage({ type: 'success', text: 'Admin removed' });
            fetchAdmins();
        } else {
            setMessage({ type: 'error', text: 'Failed to remove' });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
            {/* Add Form */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Add New Admin
                </h2>
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
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add Admin'}
                    </button>
                </form>
            </div>

            {/* Message */}
            {message && (
                <div
                    className={`p-3 rounded-lg text-sm ${
                        message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                    {message.text}
                </div>
            )}

            {/* List */}
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
                                    onClick={() => handleRemove(admin._id)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}