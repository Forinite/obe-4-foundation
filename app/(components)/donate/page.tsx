// app/(components)/donate/page.tsx

'use client';

import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DonateResultPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [reference, setReference] = useState<string | null>(null);
    const [msg, setMsg] = useState<string | null>(null);

    // Read query parameters on the client
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const s = params.get('status');
        const r = params.get('reference') ?? params.get('ref');
        setStatus(s);
        setReference(r);

        if (s === 'success') setMsg(`Thank you! Your donation was successful. Ref: ${r}`);
        else if (s === 'error') setMsg('Something went wrong. Please try again.');
        else setMsg(null);
    }, []);

    if (status === 'success')
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h1 className="text-2xl font-semibold">Donation Successful!</h1>
                <p className="text-gray-600">{msg}</p>
                <a href="/" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90">
                    Back to Home
                </a>
            </div>
        );

    if (status === 'error')
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
                <XCircle className="w-16 h-16 text-red-500" />
                <h1 className="text-2xl font-semibold">Donation Failed</h1>
                <p className="text-gray-600">{msg}</p>
                <a href="/donations" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90">
                    Try Again
                </a>
            </div>
        );

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin w-8 h-8 text-purple-500" />
            <p>Processing your donation…</p>
        </div>
    );
}
