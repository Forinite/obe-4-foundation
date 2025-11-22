//app/subcomponents/DonationComponents/DonationForm.tsx


'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

type PaymentMethod = 'Paystack' | 'PayPal' | 'CashApp' | 'Bank Transfer';
type Currency = 'NGN' | 'USD';

// Preset amounts — completely independent
const PRESETS = {
    NGN: [1000, 5000, 10000, 25000],
    USD: [5, 10, 20, 50],
};

export default function DonationForm() {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Paystack');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState<number | ''>('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    // Load CSRF token
    useEffect(() => {
        fetch('/api/csrf')
            .then(r => {
                if (!r.ok) throw new Error('Failed to load security token');
                return r.json();
            })
            .then(d => setCsrfToken(d.token))
            .catch(() => setStatus('Security check failed. Please refresh.'));
    }, []);

    const preset = (val: number) => setAmount(val);

    const formatCurrency = (val: number) => {
        return currency === 'NGN' ? `₦${val.toLocaleString()}` : `$${val}`;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !email || !csrfToken) return setStatus('Fill required fields');

        setLoading(true);
        setStatus(null);

        try {
            let endpoint = '/api/donation/record';
            if (paymentMethod === 'Paystack') endpoint = '/api/donate';
            else if (paymentMethod === 'PayPal') endpoint = '/api/donate/paypal';

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, amount, currency, message, paymentMethod, csrfToken }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');

            if (paymentMethod === 'Paystack' || paymentMethod === 'PayPal') {
                window.location.href = data.authorization_url || data.approval_url;
            } else {
                setStatus('Thank you! We’ll verify your donation.');
                setName(''); setEmail(''); setAmount(''); setMessage('');
            }
        } catch (err: any) {
            setStatus(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative max-w-md mx-auto space-y-6 p-8 rounded-2xl bg-white/70 dark:bg-gray-900/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
            {/* === Decorative Glow Ring === */}
            <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 via-cyan-500/10 to-purple-600/10 blur-xl" />

            {/* === CURRENCY SWITCHER === */}
            <div className="flex justify-center -mt-6 mb-6">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-cyan-500 p-1 rounded-full shadow-lg">
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => setCurrency('NGN')}*/}
                    {/*    className={`px-8 py-3 rounded-full text-lg font-semibold tracking-wide transition-all ${*/}
                    {/*        currency === 'NGN'*/}
                    {/*            ? 'bg-white text-purple-700 shadow-md'*/}
                    {/*            : 'text-white/90 hover:text-white'*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*    ₦ NGN*/}
                    {/*</button>*/}
                    <button
                        type="button"
                        onClick={() => setCurrency('USD')}
                        className={`px-8 py-3 rounded-full text-lg font-semibold tracking-wide transition-all ${
                            currency === 'USD'
                                ? 'bg-white text-purple-700 shadow-md'
                                : 'text-white/90 hover:text-white'
                        }`}
                    >
                        $ USD
                    </button>
                </div>
            </div>

            {/* === AMOUNT PRESETS === */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Amount
                </label>
                <div className="flex flex-wrap gap-2">
                    {PRESETS[currency].map((val) => (
                        <button
                            key={val}
                            type="button"
                            onClick={() => preset(val)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                amount === val
                                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md scale-105'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {formatCurrency(val)}
                        </button>
                    ))}
                    <input
                        type="number"
                        min="1"
                        placeholder="Custom"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value ? Number(e.target.value) : '')
                        }
                        className="flex-1 min-w-[120px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        required
                    />
                </div>
            </div>

            {/* === PAYMENT METHOD === */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                        currency === "NGN"
                            ? [
                                { id: "Paystack", label: "Paystack", desc: "Card / Bank – NGN" },
                                // { id: "CashApp", label: "Cash App", desc: "Instant mobile transfer" },
                                // { id: "Bank Transfer", label: "Bank Transfer", desc: "Manual confirmation" },
                            ]
                            : [
                                { id: "PayPal", label: "PayPal", desc: "Pay securely in USD" },
                                // { id: "Paystack", label: "Paystack", desc: "Intl. card – USD" },
                                // { id: "CashApp", label: "Cash App", desc: "Mobile transfer" },
                                // { id: "Bank Transfer", label: "Bank Transfer", desc: "Manual confirmation" },
                            ]
                    ).map((method) => (
                        <label
                            key={method.id}
                            className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                                paymentMethod === method.id
                                    ? "border-transparent bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg scale-[1.02]"
                                    : "border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 hover:border-purple-400 dark:hover:border-purple-500"
                            }`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={paymentMethod === method.id}
                                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                className="hidden"
                            />
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-base">{method.label}</span>
                                {paymentMethod === method.id && (
                                    <span className="w-5 h-5 rounded-full bg-white border-4 border-purple-700 shadow-inner"></span>
                                )}
                            </div>
                            <p
                                className={`mt-1 text-sm ${
                                    paymentMethod === method.id ? "text-white/90" : "text-gray-500 dark:text-gray-400"
                                }`}
                            >
                                {method.desc}
                            </p>
                        </label>
                    ))}
                </div>
            </div>


            {/* === NAME & EMAIL === */}
            <div className="space-y-3">
                <input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                    type="email"
                    placeholder="Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                />
            </div>

            {/* === MESSAGE === */}
            <textarea
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />

            {/* === SUBMIT BUTTON === */}
            <button
                type="submit"
                disabled={loading || !csrfToken}
                className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-all flex items-center justify-center gap-2 ${
                    loading || !csrfToken
                        ? 'bg-purple-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 shadow-lg'
                }`}
            >
                {loading ? (
                    <>
                        Processing… <Loader2 className="animate-spin w-5 h-5" />
                    </>
                ) : csrfToken ? (
                    'Donate Securely'
                ) : (
                    'Loading security…'
                )}
            </button>

            {status && (
                <p
                    className={`text-center text-sm mt-2 ${
                        status.includes('Thank you') ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {status}
                </p>
            )}
        </form>

    );
}