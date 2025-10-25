// app/(components)/donate/page.tsx

// app/donate/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DonatePage() {
    const params = useSearchParams();
    const status = params.get('status');
    const reference = params.get('reference');
    const reason = params.get('reason');

    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'success') {
            setMessage(`Thank you! Your donation was successful. Reference: ${reference}`);
        } else if (status === 'error') {
            setMessage(`Something went wrong${reason ? ` (${reason})` : ''}. Please try again.`);
        } else {
            setMessage(null);
        }
    }, [status, reference, reason]);

    if (status === 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 px-4">
                <CheckCircle className="text-green-500 w-16 h-16" />
                <h1 className="text-2xl font-semibold">Donation Successful!</h1>
                <p className="text-gray-600">{message}</p>
                <a href="/" className="bg-purple-600 text-white px-6 py-2 rounded-lg mt-4 hover:opacity-90">
                    Back to Home
                </a>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 px-4">
                <XCircle className="text-red-500 w-16 h-16" />
                <h1 className="text-2xl font-semibold">Donation Failed</h1>
                <p className="text-gray-600">{message}</p>
                <a href="/donate" className="bg-purple-600 text-white px-6 py-2 rounded-lg mt-4 hover:opacity-90">
                    Try Again
                </a>
            </div>
        );
    }

    // Default: show donation form or loading screen
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="animate-spin text-purple-500 w-8 h-8" />
            <p>Processing your donation...</p>
        </div>
    );
}
