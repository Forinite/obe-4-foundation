// app/admin/setup/page.tsx
'use client';

import { useState } from 'react';

export default function AdminSetup() {
    const [name, setName] = useState('Dr. Obe Admin');
    const [email, setEmail] = useState('admin@drobe-foundation.org');
    const [password, setPassword] = useState('admin123');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success?: string; error?: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult({});

        try {
            const res = await fetch('/api/admin/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setResult({ success: `Admin created! Login at /admin/login` });
            } else {
                setResult({ error: data.error || 'Failed to create admin' });
            }
        } catch (err) {
            setResult({ error: 'Network error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Create First Admin</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Run this once to set up your admin account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Admin'}
                    </button>
                </form>

                {result.success && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
                        {result.success}
                    </div>
                )}

                {result.error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
                        {result.error}
                    </div>
                )}

                <p className="text-xs text-center text-gray-500 mt-6">
                    After creating, go to <a href="/admin/login" className="text-indigo-600 underline">/admin/login</a>
                </p>
            </div>
        </div>
    );
}