//app/subcomponents/DonationComponents/AccountCard.tsx
// app/subcomponents/DonationComponents/AccountCard.tsx

'use client';

import React, { useState } from 'react';

interface AccountCardProps {
    bankName: string;
    accountName: string;
    accountNumber: string;
    gradient: string;
    textColor: string;
    position?: string;
}

export default function AccountCard({
                                        bankName,
                                        accountName,
                                        accountNumber,
                                        gradient,
                                        textColor,
                                        position = '',
                                    }: AccountCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent any parent click handlers

        try {
            await navigator.clipboard.writeText(accountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={`relative lg:absolute ${position} w-fit max-w-xs mx-auto`}>
            {/* Outer glowing gradient border */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} p-[2px] blur-[2px] opacity-70`} />

            {/* Inner card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-5 text-center shadow-md hover:shadow-lg transition-all duration-300">

                {/* Bank Name */}
                <h1 className={`text-xl font-bold ${textColor} tracking-wide mb-2`}>
                    {bankName}
                </h1>

                {/* Account Holder Name */}
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-4">
                    {accountName}
                </p>

                {/* Clickable Account Number */}
                <div className="relative inline-block">
                    <div
                        onClick={handleCopy}
                        className="group flex items-center gap-2 cursor-pointer select-none"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleCopy(e as any)}
                    >
                        <p className="text-gray-900 dark:text-gray-100 font-mono font-bold text-lg tracking-wider bg-gray-100 dark:bg-gray-800 rounded-lg py-2 px-5 transition-all group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                            {accountNumber}
                        </p>

                        {/* Copy Icon + Feedback */}
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {copied ? (
                                <span className="text-green-600">Copied!</span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}