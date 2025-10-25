//app/subcomponents/DonationComponents/DonationForm.tsx

'use client';

import React, { useState } from 'react';

export default function DonationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState<number | ''>('');
    const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
    const [paymentMethod, setPaymentMethod] = useState<'Paystack' | 'CashApp'>('Paystack');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const preset = (val: number) => setAmount(val);

    const handlePaystack = async () => {
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/donate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, amount, currency, message, paymentMethod }),
            });
            const data = await res.json();
            if (!res.ok) {
                setStatus(data.error || 'Failed to initialize payment');
                setLoading(false);
                return;
            }
            // Redirect user to Paystack payment page
            window.location.href = data.authorization_url;
        } catch (err) {
            console.error(err);
            setStatus('Server error');
            setLoading(false);
        }
    };

    const handleCashApp = async () => {
        setLoading(true);
        setStatus(null);
        try {
            const res = await fetch('/api/donation/record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, amount, currency, paymentMethod: 'CashApp', message }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('Thank you — we recorded your donation as pending verification.');
                setName(''); setEmail(''); setAmount(''); setMessage('');
            } else {
                setStatus(data.error || 'Failed to record donation');
            }
        } catch (err) {
            console.error(err);
            setStatus('Server error');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !email) {
            setStatus('Please provide amount and email.');
            return;
        }
        if (paymentMethod === 'Paystack') {
            await handlePaystack();
        } else {
            await handleCashApp();
        }
    };

    return (
        <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-xl shadow">
            <h3 className="text-2xl font-semibold">Donate</h3>

            <div>
                <label className="text-sm">Amount</label>
                <div className="flex gap-2 mt-2">
                    {[1000,5000,10000,25000].map(v => (
                        <button type="button" key={v} onClick={() => preset(v)} className={`px-3 py-2 rounded ${amount === v ? 'bg-cyan-600 text-white' : 'bg-gray-100'}`}>
                            {currency === 'NGN' ? `₦${v.toLocaleString()}` : `$${(v/1000).toFixed(2)}`}
                        </button>
                    ))}
                    <input
                        type="number"
                        placeholder="Custom"
                        value={amount || ''}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="ml-2 px-3 py-2 border rounded w-full"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <label>
                    <input type="radio" name="currency" checked={currency === 'NGN'} onChange={() => setCurrency('NGN')} /> NGN
                </label>
                <label>
                    <input type="radio" name="currency" checked={currency === 'USD'} onChange={() => setCurrency('USD')} /> USD
                </label>
            </div>

            <div>
                <label>Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="w-full px-3 py-2 border rounded">
                    <option value="Paystack">Paystack (Card / PayPal / Bank)</option>
                    <option value="CashApp">Cash App / Manual</option>
                </select>
            </div>

            <div>
                <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>

            <div>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>

            <div>
                <textarea placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>

            <div>
                <button disabled={loading} type="submit" className="w-full py-3 rounded bg-purple-600 text-white">
                    {loading ? 'Processing...' : 'Donate Securely'}
                </button>
            </div>

            {status && <p className="text-sm text-center mt-2">{status}</p>}
        </form>
    );
}
