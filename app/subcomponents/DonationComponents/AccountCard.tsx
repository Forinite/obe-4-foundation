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

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };


    return (
        <div className={`relative lg:absolute ${position} w-fit max-w-xs mx-auto`}>
            {/* Outer glowing gradient border */}
            <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} p-[2px] blur-[2px]`}
            />

            {/* Inner card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4 text-center shadow-md hover:shadow-lg transition-all duration-300">

                {/* Bank Name */}
                <h1 className={`text-lg font-semibold ${textColor} tracking-wide mb-1`}>
                    {bankName}
                </h1>

                {/* Account Name */}
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                    {accountName}
                </p>

                {/* Account Number (copy on click) */}
                <p
                    onClick={handleCopy}
                    className="
                        text-gray-900 dark:text-gray-100
                        font-semibold text-sm tracking-wider
                        bg-gray-100 dark:bg-gray-800
                        rounded-md py-1 px-3 inline-block
                        cursor-pointer select-none
                        hover:bg-gray-200 dark:hover:bg-gray-700
                        transition
                    "
                >
                    {accountNumber}
                </p>

                {/* Copied Feedback */}
                {copied && (
                    <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                        Copied!
                    </p>
                )}
            </div>
        </div>
    );
}
